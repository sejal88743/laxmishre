-- Create BIM table
create table if not exists bim (
  id uuid default uuid_generate_v4() primary key,
  bim_number varchar not null unique,
  bim_meter decimal not null,
  par_taka decimal not null,
  bim_taka decimal not null,
  pending_taka decimal not null,
  pending_meter decimal not null,
  load_date date not null,
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create production table
create table if not exists production (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  taka_number varchar not null unique,
  machine_number varchar not null,
  bim_number varchar not null references bim(bim_number),
  pending_taka decimal not null,
  total_meter decimal not null,
  wet_value decimal not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create production details table for daily worker production
create table if not exists production_details (
  id uuid default uuid_generate_v4() primary key,
  production_id uuid references production(id),
  date_number integer not null,
  worker1_production decimal default 0,
  worker2_production decimal default 0,
  worker3_production decimal default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
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