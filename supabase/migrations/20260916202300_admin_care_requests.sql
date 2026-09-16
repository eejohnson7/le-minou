begin;

-- Membership is managed only through trusted database access, never through the app.
create table public.admin_members (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_members enable row level security;
revoke all on public.admin_members from public, anon, authenticated;
grant select on public.admin_members to authenticated;
grant select, insert, delete on public.admin_members to service_role;
create policy "Admins can check their membership" on public.admin_members
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_admin() returns boolean
language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.admin_members where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.care_inquiry drop constraint care_inquiry_status;
-- Preserve older closed requests as declined leads; confirmation does not create a booking.
update public.care_inquiry set status = 'declined' where status = 'closed';
alter table public.care_inquiry add constraint care_inquiry_status
  check (status in ('new', 'contacted', 'confirmed', 'declined'));
alter table public.care_inquiry drop constraint care_inquiry_services;
alter table public.care_inquiry add constraint care_inquiry_services
  check (cardinality(services) between 1 and 4 and services <@
    array['30-MINUTE VISIT', '60-MINUTE VISIT', 'DOG WALK', '60-MINUTE DOG WALK']::text[]);

-- Keep existing public INSERT grants and policy. Only status may be edited.
grant select on public.care_inquiry to authenticated;
grant update (status) on public.care_inquiry to authenticated;
create policy "Admins can read care inquiries" on public.care_inquiry
  for select to authenticated using ((select public.is_admin()));
create policy "Admins can update care inquiry status" on public.care_inquiry
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create index care_inquiry_status_created_at_idx on public.care_inquiry(status, created_at desc, id desc);
commit;
