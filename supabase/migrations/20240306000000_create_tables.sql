-- Create BIM table
create table if not exists bim (
  id uuid default uuid_generate_v4() primary key,
  bim_number varchar not null unique,
  bim_meter decimal not null,
  par_taka decimal not null,
  bim_taka decimal generated always as (bim_meter / par_taka) stored,
  pending_taka decimal not null,
  pending_meter decimal not null,
  load_date date not null default current_date,
  machine_number varchar,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create workers table
create table if not exists workers (
  id uuid default uuid_generate_v4() primary key,
  worker_name varchar not null,
  mobile_number varchar,
  machine_number varchar,
  salary_rate decimal not null default 20,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create machines table
create table if not exists machines (
  id uuid default uuid_generate_v4() primary key,
  machine_number varchar not null unique,
  bim_number varchar not null references bim(bim_number),
  production_rate decimal not null,
  worker1 uuid references workers(id),
  worker2 uuid references workers(id),
  worker3 uuid references workers(id),
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create production table
create table if not exists production (
  id uuid default uuid_generate_v4() primary key,
  date date not null default current_date,
  taka_number varchar not null unique,
  machine_number varchar not null references machines(machine_number),
  bim_number varchar not null references bim(bim_number),
  pending_taka decimal not null,
  total_meter decimal not null,
  wet_value decimal not null,
  wet_per_meter decimal generated always as (wet_value / nullif(total_meter, 0)) stored,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create production details table
create table if not exists production_details (
  id uuid default uuid_generate_v4() primary key,
  production_id uuid references production(id) on delete cascade,
  date_number integer not null,
  worker1_production decimal default 0,
  worker2_production decimal default 0,
  worker3_production decimal default 0,
  total_production decimal generated always as (worker1_production + worker2_production + worker3_production) stored,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(production_id, date_number)
);

-- Create function to update timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger update_bim_updated_at
  before update on bim
  for each row
  execute function update_updated_at_column();

create trigger update_workers_updated_at
  before update on workers
  for each row
  execute function update_updated_at_column();

create trigger update_machines_updated_at
  before update on machines
  for each row
  execute function update_updated_at_column();

create trigger update_production_updated_at
  before update on production
  for each row
  execute function update_updated_at_column();

create trigger update_production_details_updated_at
  before update on production_details
  for each row
  execute function update_updated_at_column();

-- Enable RLS and create policies
alter table bim enable row level security;
alter table workers enable row level security;
alter table machines enable row level security;
alter table production enable row level security;
alter table production_details enable row level security;

-- Create policies
create policy "Enable all access for authenticated users" on bim
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on workers
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on machines
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on production
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on production_details
  for all using (auth.role() = 'authenticated');