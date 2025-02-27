INSERT INTO plant_type (name) VALUES
('Fruit'),
('Légume');

INSERT INTO roles (name) VALUES
('USER'),
('ADMIN');

INSERT INTO plant (name, type_id, image_name, debut_recolte, fin_recolte) VALUES
('Citron', 1, 'citron', '11', '03'),
('Orange', 1, 'orange', '11', '03'),
('Carotte', 2, 'carotte', '05', '10'),
('Mirabelle', 1, 'mirabelle', '08', '09'),
('Raisin', 1, 'raisin', '09', '10'),
('Tomate', 2, 'tomate', '07', '09'),
('Fraise', 1, 'fraise', '05', '07'),
('Framboise', 1, 'framboise', '06', '10'),
('Patate', 2, 'patate', '08', '10'),
('Radis', 2, 'radis', '03', '06'),
('Chou', 2, 'chou', '09', '03'),
('Aubergine', 2, 'aubergine', '07', '09'),
('Butternut', 2, 'butternut', '09', '11'),
('Navet', 2, 'navet', '10', '04'),
('Salade', 2, 'salade', '03', '10');
