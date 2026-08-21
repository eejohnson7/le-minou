create table public.care_inquiry (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  neighborhood_or_zip text not null,
  pet_type text not null,
  pet_count smallint not null,
  pet_names text,
  services text[] not null,
  timing_type text not null,
  start_date date,
  end_date date,
  recurring_schedule text,
  pet_routine_notes text not null,
  status text not null default 'new',

  constraint care_inquiry_full_name_length
    check (char_length(trim(full_name)) between 1 and 120),
  constraint care_inquiry_email_length
    check (char_length(trim(email)) between 3 and 254 and position('@' in email) > 1),
  constraint care_inquiry_phone_length
    check (phone is null or char_length(phone) <= 40),
  constraint care_inquiry_location_length
    check (char_length(trim(neighborhood_or_zip)) between 1 and 120),
  constraint care_inquiry_pet_type
    check (pet_type in ('cat', 'dog', 'both')),
  constraint care_inquiry_pet_count
    check (pet_count between 1 and 20),
  constraint care_inquiry_pet_names_length
    check (pet_names is null or char_length(pet_names) <= 250),
  constraint care_inquiry_services
    check (
      cardinality(services) between 1 and 3
      and services <@ array['30-MINUTE VISIT', '60-MINUTE VISIT', 'DOG WALK']::text[]
    ),
  constraint care_inquiry_timing_type
    check (timing_type in ('specific_dates', 'recurring', 'not_sure')),
  constraint care_inquiry_timing_details
    check (
      (
        timing_type = 'specific_dates'
        and start_date is not null
        and end_date is not null
        and end_date >= start_date
        and recurring_schedule is null
      )
      or (
        timing_type = 'recurring'
        and start_date is null
        and end_date is null
        and recurring_schedule is not null
        and char_length(trim(recurring_schedule)) between 1 and 500
      )
      or (
        timing_type = 'not_sure'
        and start_date is null
        and end_date is null
        and recurring_schedule is null
      )
    ),
  constraint care_inquiry_routine_notes_length
    check (char_length(trim(pet_routine_notes)) between 1 and 4000),
  constraint care_inquiry_status
    check (status in ('new', 'contacted', 'closed'))
);

alter table public.care_inquiry enable row level security;

revoke all on table public.care_inquiry from anon, authenticated;
grant insert (
  full_name,
  email,
  phone,
  neighborhood_or_zip,
  pet_type,
  pet_count,
  pet_names,
  services,
  timing_type,
  start_date,
  end_date,
  recurring_schedule,
  pet_routine_notes
) on table public.care_inquiry to anon, authenticated;
grant select, insert, update, delete on table public.care_inquiry to service_role;

create policy "Public visitors can create new care inquiries"
  on public.care_inquiry
  for insert
  to anon, authenticated
  with check (status = 'new');

comment on table public.care_inquiry is
  'Public, inquiry-first care requests. These rows are leads, not bookings or availability holds.';
