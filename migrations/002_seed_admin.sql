INSERT INTO roles (role_name, description)
VALUES ('admin', 'Administrador del sistema')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO users (email, password, name, phone, is_active)
VALUES (
  'admin@example.com',
  '$2b$10$5mYwhag1J8NpUmt3uizoQuFxD3ZkNGdoBPSmqKpWsuHSglG4NQwzm',
  'Admin',
  NULL,
  true
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users_roles (user_id, role_id)
SELECT users.id, roles.id
FROM users, roles
WHERE users.email = 'admin@example.com'
  AND roles.role_name = 'admin'
ON CONFLICT DO NOTHING;

