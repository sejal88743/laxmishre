-- Create tables for BIM management system

-- Workers table
create table if not exists workers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  contact_number text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Machines table
create table if not exists machines (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null,
  status text not null,
  last_maintenance timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  start_date date not null,
  end_date date,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Production records table
create table if not exists production_records (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id),
  machine_id uuid references machines(id),
  worker_id uuid references workers(id),
  quantity numeric not null,
  unit text not null,
  date date not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table workers enable row level security;
alter table machines enable row level security;
alter table projects enable row level security;
alter table production_records enable row level security;

-- Create policies
create policy "Public workers are viewable by everyone."
  on workers for select
  using ( true );

create policy "Public machines are viewable by everyone."
  on machines for select
  using ( true );

create policy "Public projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Public production records are viewable by everyone."
  on production_records for select
  using ( true );