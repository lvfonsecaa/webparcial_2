CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  name varchar NOT NULL,
  phone varchar NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_name varchar NOT NULL UNIQUE,
  description varchar NULL
);

CREATE TABLE IF NOT EXISTS users_roles (
  user_id uuid NOT NULL,
  role_id uuid NOT NULL,
  CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_users_roles_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_users_roles_role FOREIGN KEY (role_id)
    REFERENCES roles(id) ON DELETE CASCADE
);

