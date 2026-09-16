-- Run only against a disposable database after migrations. All fixtures roll back.
begin;
insert into auth.users(id, email) values
  ('00000000-0000-4000-8000-000000000001', 'admin@example.test'),
  ('00000000-0000-4000-8000-000000000002', 'client@example.test');
insert into public.admin_members(user_id) values ('00000000-0000-4000-8000-000000000001');
insert into public.care_inquiry(id, full_name, email, neighborhood_or_zip, pet_type, pet_count, services, timing_type, pet_routine_notes)
values ('00000000-0000-4000-8000-000000000003', 'Test request', 'test@example.test', 'Test area', 'both', 2,
  array['30-MINUTE VISIT', '60-MINUTE DOG WALK'], 'not_sure', 'Synthetic test');

set local role anon;
insert into public.care_inquiry(full_name, email, neighborhood_or_zip, pet_type, pet_count, services, timing_type, pet_routine_notes)
values ('Public request', 'public@example.test', 'Test area', 'dog', 1, array['60-MINUTE DOG WALK'], 'not_sure', 'Synthetic test');
do $$ begin
  begin perform id from public.care_inquiry; raise exception 'Anonymous read allowed';
  exception when insufficient_privilege then null; end;
  begin update public.care_inquiry set status = 'confirmed'; raise exception 'Anonymous update allowed';
  exception when insufficient_privilege then null; end;
  begin delete from public.care_inquiry; raise exception 'Anonymous delete allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000002', true);
do $$ declare affected integer; begin
  if public.is_admin() then raise exception 'Client granted admin access'; end if;
  if exists(select 1 from public.care_inquiry) then raise exception 'Client read allowed'; end if;
  update public.care_inquiry set status = 'confirmed';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Client update allowed'; end if;
  begin insert into public.admin_members values ('00000000-0000-4000-8000-000000000002');
    raise exception 'Client self-promotion allowed'; exception when insufficient_privilege then null; end;
end $$;
-- Signed-in clients can still submit requests without elevated privileges.
insert into public.care_inquiry(full_name, email, neighborhood_or_zip, pet_type, pet_count, services, timing_type, pet_routine_notes)
values ('Client request', 'client@example.test', 'Test area', 'cat', 1, array['30-MINUTE VISIT'], 'not_sure', 'Synthetic test');
select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000001', true);
do $$ declare affected integer; next_status text; begin
  if not public.is_admin() then raise exception 'Admin access missing'; end if;
  if not exists(select 1 from public.care_inquiry where id = '00000000-0000-4000-8000-000000000003') then
    raise exception 'Admin cannot read request'; end if;
  foreach next_status in array array['contacted', 'confirmed', 'declined', 'new'] loop
    update public.care_inquiry set status = next_status where id = '00000000-0000-4000-8000-000000000003';
    get diagnostics affected = row_count;
    if affected <> 1 then raise exception 'Status update failed'; end if;
    if (select status from public.care_inquiry where id = '00000000-0000-4000-8000-000000000003') <> next_status then
      raise exception 'Status not persisted'; end if;
  end loop;
  begin update public.care_inquiry set status = 'invalid'; raise exception 'Invalid status allowed';
    exception when check_violation then null; end;
  begin update public.care_inquiry set email = 'changed@example.test'; raise exception 'Contact edit allowed';
    exception when insufficient_privilege then null; end;
  begin delete from public.care_inquiry; raise exception 'Admin delete allowed';
    exception when insufficient_privilege then null; end;
end $$;
reset role;
-- Revoking membership takes effect without waiting for a token refresh.
delete from public.admin_members where user_id = '00000000-0000-4000-8000-000000000001';
set local role authenticated;
do $$ begin
  if public.is_admin() or exists(select 1 from public.care_inquiry) then raise exception 'Revoked admin retained access'; end if;
end $$;
reset role;
rollback;
