INSERT INTO plant_type (name) VALUES
('Fruit'),
('Légume');

INSERT INTO roles (name) VALUES
('USER'),
('ADMIN');

INSERT INTO plant (name, type_id, description, image_name, debut_recolte, fin_recolte) VALUES
('Citron', 1, 'Agrume jaune au goût acidulé, riche en vitamine C, utilisé en cuisine et en boisson.', 'citron', '11', '03'),
('Orange', 1, 'Agrume sucré et juteux, souvent consommé frais ou en jus.', 'orange', '11', '03'),
('Carotte', 2, 'Légume-racine croquant et sucré, riche en bêta-carotène, consommé cru ou cuit.', 'carotte', '05', '10'),
('Mirabelle', 1, 'Petite prune dorée sucrée, souvent utilisée pour les tartes et confitures.', 'mirabelle', '08', '09'),
('Raisin', 1, 'Fruit en grappes, utilisé pour le vin, le jus ou consommé frais.', 'raisin', '09', '10'),
('Tomate', 2, 'Fruit rouge ou jaune, élément clé de nombreuses recettes méditerranéennes.', 'tomate', '07', '09'),
('Fraise', 1, 'Petit fruit rouge sucré et parfumé, apprécié en dessert et en confiture.', 'fraise', '05', '07'),
('Framboise', 1, 'Baie rouge ou jaune acidulée, idéale en pâtisserie et confitures.', 'framboise', '06', '10'),
('Patate', 2, 'Tubercule polyvalent, consommé sous forme de purée, frites ou gratin.', 'patate', '08', '10'),
('Radis', 2, 'Petit légume racine croquant et piquant, souvent consommé cru.', 'radis', '03', '06'),
('Chou', 2, 'Légume-feuille résistant, utilisé en soupe, salade ou fermenté en choucroute.', 'chou', '09', '03'),
('Aubergine', 2, 'Légume allongé violet, idéal pour les gratins et les ratatouilles.', 'aubergine', '07', '09'),
('Butternut', 2, 'Courge à la chair douce et sucrée, parfaite en soupe ou gratin.', 'butternut', '09', '11'),
('Navet', 2, 'Légume-racine au goût légèrement sucré, souvent utilisé en pot-au-feu.', 'navet', '10', '04'),
('Salade', 2, 'Feuilles vertes croquantes, base incontournable des entrées fraîches.', 'salade', '03', '10');

