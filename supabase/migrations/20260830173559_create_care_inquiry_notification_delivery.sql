create table public.care_inquiry_notification_delivery (
  inquiry_id uuid primary key references public.care_inquiry (id) on delete cascade,
  state text not null default 'processing',
  attempt_count integer not null default 1,
  claim_token uuid not null default gen_random_uuid(),
  processing_started_at timestamptz not null default now(),
  provider_message_id uuid,
  last_error text,
  manual_retry_approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sent_at timestamptz,

  constraint care_inquiry_notification_delivery_state
    check (state in ('processing', 'sent', 'failed')),
  constraint care_inquiry_notification_delivery_attempt_count
    check (attempt_count > 0),
  constraint care_inquiry_notification_delivery_last_error_length
    check (last_error is null or char_length(last_error) between 1 and 120),
  constraint care_inquiry_notification_delivery_state_fields
    check (
      (
        state = 'sent'
        and provider_message_id is not null
        and sent_at is not null
        and last_error is null
        and manual_retry_approved_at is null
      )
      or (
        state = 'failed'
        and provider_message_id is null
        and sent_at is null
        and last_error is not null
      )
      or (
        state = 'processing'
        and provider_message_id is null
        and sent_at is null
        and last_error is null
      )
    )
);

alter table public.care_inquiry_notification_delivery enable row level security;

revoke all on table public.care_inquiry_notification_delivery
  from public, anon, authenticated;
grant select, insert, update on table public.care_inquiry_notification_delivery
  to service_role;

create function public.claim_care_inquiry_notification_delivery(
  p_inquiry_id uuid,
  p_inquiry_created_at timestamptz
)
returns table (
  claim_status text,
  claim_token uuid,
  attempt_count integer
)
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_now timestamptz := statement_timestamp();
  v_claim_token uuid := gen_random_uuid();
  v_delivery public.care_inquiry_notification_delivery%rowtype;
begin
  if not exists (
    select 1
    from public.care_inquiry
    where id = p_inquiry_id
      and created_at = p_inquiry_created_at
  ) then
    return query select 'invalid'::text, null::uuid, 0::integer;
    return;
  end if;

  insert into public.care_inquiry_notification_delivery as delivery (
    inquiry_id,
    state,
    attempt_count,
    claim_token,
    processing_started_at,
    created_at,
    updated_at
  )
  values (
    p_inquiry_id,
    'processing',
    1,
    v_claim_token,
    v_now,
    v_now,
    v_now
  )
  on conflict (inquiry_id) do update
  set
    state = 'processing',
    attempt_count = delivery.attempt_count + 1,
    claim_token = v_claim_token,
    processing_started_at = v_now,
    provider_message_id = null,
    last_error = null,
    manual_retry_approved_at = null,
    updated_at = v_now,
    sent_at = null
  where
    (
      delivery.state = 'failed'
      and (
        delivery.created_at > v_now - interval '23 hours'
        or delivery.manual_retry_approved_at is not null
      )
    )
    or (
      delivery.state = 'processing'
      and delivery.processing_started_at <= v_now - interval '15 minutes'
      and (
        delivery.created_at > v_now - interval '23 hours'
        or delivery.manual_retry_approved_at is not null
      )
    )
  returning delivery.* into v_delivery;

  if found then
    return query
      select 'claimed'::text, v_delivery.claim_token, v_delivery.attempt_count;
    return;
  end if;

  select *
  into v_delivery
  from public.care_inquiry_notification_delivery as delivery
  where delivery.inquiry_id = p_inquiry_id;

  return query
    select
      case
        when v_delivery.state = 'sent' then 'sent'
        when v_delivery.state = 'failed'
          and v_delivery.created_at <= v_now - interval '23 hours'
          then 'manual_review'
        when v_delivery.state = 'processing'
          and v_delivery.processing_started_at <= v_now - interval '15 minutes'
          and v_delivery.created_at <= v_now - interval '23 hours'
          then 'manual_review'
        else 'busy'
      end::text,
      null::uuid,
      v_delivery.attempt_count;
end;
$function$;

create function public.complete_care_inquiry_notification_delivery(
  p_inquiry_id uuid,
  p_claim_token uuid,
  p_provider_message_id uuid
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_updated_count integer;
begin
  update public.care_inquiry_notification_delivery
  set
    state = 'sent',
    provider_message_id = p_provider_message_id,
    last_error = null,
    manual_retry_approved_at = null,
    updated_at = statement_timestamp(),
    sent_at = statement_timestamp()
  where inquiry_id = p_inquiry_id
    and claim_token = p_claim_token
    and state = 'processing';

  get diagnostics v_updated_count = row_count;
  return v_updated_count = 1;
end;
$function$;

create function public.fail_care_inquiry_notification_delivery(
  p_inquiry_id uuid,
  p_claim_token uuid,
  p_last_error text
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_updated_count integer;
begin
  update public.care_inquiry_notification_delivery
  set
    state = 'failed',
    provider_message_id = null,
    last_error = p_last_error,
    updated_at = statement_timestamp(),
    sent_at = null
  where inquiry_id = p_inquiry_id
    and claim_token = p_claim_token
    and state = 'processing';

  get diagnostics v_updated_count = row_count;
  return v_updated_count = 1;
end;
$function$;

revoke all on function public.claim_care_inquiry_notification_delivery(uuid, timestamptz)
  from public, anon, authenticated;
revoke all on function public.complete_care_inquiry_notification_delivery(uuid, uuid, uuid)
  from public, anon, authenticated;
revoke all on function public.fail_care_inquiry_notification_delivery(uuid, uuid, text)
  from public, anon, authenticated;

grant execute on function public.claim_care_inquiry_notification_delivery(uuid, timestamptz)
  to service_role;
grant execute on function public.complete_care_inquiry_notification_delivery(uuid, uuid, uuid)
  to service_role;
grant execute on function public.fail_care_inquiry_notification_delivery(uuid, uuid, text)
  to service_role;

comment on table public.care_inquiry_notification_delivery is
  'Private delivery state for the single care-inquiry email notification. Stores no message body or inquiry PII.';
comment on column public.care_inquiry_notification_delivery.manual_retry_approved_at is
  'Set manually only after reviewing Resend delivery history for an attempt older than the provider idempotency window.';
comment on column public.care_inquiry_notification_delivery.created_at is
  'Time of the first notification claim; anchors the automatic retry window and is never reset by retries.';
