INSERT INTO roles_entity (role_name, description)
VALUES ('admin', 'Administrador del sistema');

INSERT INTO roles_entity (role_name, description)
VALUES ('doctor', 'Usuario doctor');

INSERT INTO users_entity (email, password, name, phone, is_active)
VALUES (
  'admin@example.com',
  '$2b$10$5mYwhag1J8NpUmt3uizoQuFxD3ZkNGdoBPSmqKpWsuHSglG4NQwzm',
  'Admin',
  NULL,
  true
)
;

INSERT INTO users_entity_roles_entity (users_entity_id, roles_entity_id)
SELECT users_entity.id, roles_entity.id
FROM users_entity, roles_entity
WHERE users_entity.email = 'admin@example.com'
  AND roles_entity.role_name = 'admin';

INSERT INTO users_entity (email, password, name, phone, is_active)
VALUES (
  'doctor@example.com',
  '$2b$10$H8mn5PEzDffAxw7Jpp1TY.Hrm8Fdq0wo7Z5uyNp2zcqriv1scZ/.K',
  'Doctor Prueba',
  '3001112233',
  true
)
;

INSERT INTO users_entity_roles_entity (users_entity_id, roles_entity_id)
SELECT users_entity.id, roles_entity.id
FROM users_entity, roles_entity
WHERE users_entity.email = 'doctor@example.com'
  AND roles_entity.role_name = 'doctor';

INSERT INTO users_entity (email, password, name, phone, is_active)
VALUES (
  'user@example.com',
  '$2b$10$6zsWOLOr/P/IfuYPAYdy8efhg1IPD.aLPFcWbu835QUSWqrA2C74i',
  'Usuario Prueba',
  '3004445566',
  true
)
;
