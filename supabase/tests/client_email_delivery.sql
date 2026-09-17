-- Run after the care inquiry and both notification delivery migrations.
begin;
do $$
declare
  inquiry public.care_inquiry%rowtype;
  claim record;
  retry record;
  role_name text;
  fn text;
begin
  foreach role_name in array array['anon', 'authenticated'] loop
    if has_table_privilege(role_name, 'public.care_inquiry_client_confirmation_delivery', 'SELECT,INSERT,UPDATE,DELETE') then
      raise exception 'Browser role has client ledger access';
    end if;
    foreach fn in array array[
      'public.claim_care_inquiry_client_confirmation_delivery(uuid,timestamptz)',
      'public.complete_care_inquiry_client_confirmation_delivery(uuid,uuid,uuid)',
      'public.fail_care_inquiry_client_confirmation_delivery(uuid,uuid,text)'
    ] loop
      if has_function_privilege(role_name, fn, 'EXECUTE') then
        raise exception 'Browser role has delivery RPC access';
      end if;
    end loop;
  end loop;
  if not (select relrowsecurity from pg_class where oid = 'public.care_inquiry_client_confirmation_delivery'::regclass) then
    raise exception 'Client ledger RLS disabled';
  end if;
  insert into public.care_inquiry(full_name,email,neighborhood_or_zip,pet_type,pet_count,services,timing_type,pet_routine_notes)
    values ('Test','test@example.test','Test','cat',1,array['30-MINUTE VISIT'],'not_sure','Test') returning * into inquiry;
  select * into claim from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id, inquiry.created_at + interval '1 second');
  if claim.claim_status <> 'invalid' then raise exception 'Invalid event accepted'; end if;
  set local role service_role;
  select * into claim from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id, inquiry.created_at);
  if claim.claim_status <> 'claimed' then raise exception 'Initial claim failed'; end if;
  select * into retry from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id, inquiry.created_at);
  if retry.claim_status <> 'busy' then raise exception 'Concurrent claim accepted'; end if;
  if public.complete_care_inquiry_client_confirmation_delivery(inquiry.id, gen_random_uuid(), gen_random_uuid()) then raise exception 'Stale token accepted'; end if;
  perform public.fail_care_inquiry_client_confirmation_delivery(inquiry.id, claim.claim_token, 'provider_unavailable');
  select * into retry from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id, inquiry.created_at);
  if retry.claim_status <> 'claimed' or retry.attempt_count <> 2 then raise exception 'Retry failed'; end if;
  if public.complete_care_inquiry_client_confirmation_delivery(inquiry.id, claim.claim_token, gen_random_uuid()) then raise exception 'Old worker finalized retry'; end if;
  perform public.complete_care_inquiry_client_confirmation_delivery(inquiry.id, retry.claim_token, gen_random_uuid());
  select * into retry from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id, inquiry.created_at);
  if retry.claim_status <> 'sent' then raise exception 'Successful delivery resent'; end if;
  select * into claim from public.claim_care_inquiry_notification_delivery(inquiry.id, inquiry.created_at);
  if claim.claim_status <> 'claimed' then raise exception 'Client state blocked owner'; end if;
  reset role;
  update public.care_inquiry_client_confirmation_delivery set state='failed',provider_message_id=null,sent_at=null,last_error='provider_unavailable',created_at=now()-interval '25 hours' where inquiry_id=inquiry.id;
  set local role service_role;
  select * into claim from public.claim_care_inquiry_client_confirmation_delivery(inquiry.id,inquiry.created_at);
  if claim.claim_status <> 'manual_review' then raise exception 'Expired retry accepted'; end if;
  reset role;
end;
$$;
rollback;
