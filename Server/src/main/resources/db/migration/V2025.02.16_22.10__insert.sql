drop table if exists purchase;
drop table if exists client;
drop table if exists dish;

INSERT INTO plant_type (name) VALUES
('Fruit'),
('Légume');

INSERT INTO plant (name, type_id, image_name) VALUES
('Tomate', 1, 'tomate'),
('Fraise', 1, 'fraise'),
('Framboise', 1, 'framboise'),
('Mirabelle', 1, 'mirabelle'),
('Raisin', 1, 'raisin'),
('Carotte', 2, 'carotte'),
('Patate', 2, 'patate'),
('Radis', 2, 'radis'),
('Chou', 2, 'chou'),
('Aubergine', 2, 'aubergine'),
('Butternut', 2, 'butternut'),
('Citron', 1, 'citron'),
('Orange', 2, 'orange'),
('Navet', 2, 'navet'),
('Salade', 2, 'salade');
