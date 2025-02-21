drop table if exists purchase;
drop table if exists client;
drop table if exists dish;

INSERT INTO plant_type (name) VALUES
('Fruit'),
('Légume');

INSERT INTO roles (name) VALUES
('USER'),
('ADMIN');

INSERT INTO plant (name, type_id, image_name) VALUES
('Citron', 1, 'citron'),
('Orange', 1, 'orange'),
('Carotte', 2, 'carotte'),
('Mirabelle', 1, 'mirabelle'),
('Raisin', 1, 'raisin'),
('Tomate', 2, 'tomate'),
('Fraise', 1, 'fraise'),
('Framboise', 1, 'framboise'),
('Patate', 2, 'patate'),
('Radis', 2, 'radis'),
('Chou', 2, 'chou'),
('Aubergine', 2, 'aubergine'),
('Butternut', 2, 'butternut'),
('Navet', 2, 'navet'),
('Salade', 2, 'salade');
