CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users_entity (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  name varchar NOT NULL,
  phone varchar NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles_entity (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_name varchar NOT NULL UNIQUE,
  description varchar NULL
);

CREATE TABLE IF NOT EXISTS users_entity_roles_entity (
  users_entity_id uuid NOT NULL,
  roles_entity_id uuid NOT NULL,
  CONSTRAINT pk_users_entity_roles_entity PRIMARY KEY (users_entity_id, roles_entity_id),
  CONSTRAINT fk_users_entity_roles_entity_user FOREIGN KEY (users_entity_id)
    REFERENCES users_entity(id) ON DELETE CASCADE,
  CONSTRAINT fk_users_entity_roles_entity_role FOREIGN KEY (roles_entity_id)
    REFERENCES roles_entity(id) ON DELETE CASCADE
);
