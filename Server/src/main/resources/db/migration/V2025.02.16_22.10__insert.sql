INSERT INTO plant_type (name) VALUES
('Fruit'),
('Légume'),
('Aromatique'),
('Plante d’intérieur');

INSERT INTO roles (name) VALUES
('USER'),
('ADMIN');

INSERT INTO besoin_soleil (name) VALUES
('Peu'),
('Moyen'),
('Beaucoup');

INSERT INTO plant (name, type_id, description, image_name, debut_recolte, fin_recolte, besoin_soleil_id, frequence_arrosage, famille) VALUES
('Citron', 1, 'Agrume jaune au goût acidulé, riche en vitamine C.', 'citron', '11', '03', 3, 7, 'Rutaceae'),
('Orange', 1, 'Agrume sucré et juteux, consommé frais ou en jus.', 'orange', '12', '03', 3, 7, 'Rutaceae'),
('Carotte', 2, 'Légume-racine croquant et riche en bêta-carotène.', 'carotte', '06', '10', 2, 4, 'Apiaceae'),
('Mirabelle', 1, 'Petite prune dorée sucrée, utilisée en tartes et confitures.', 'mirabelle', '08', '09', 3, 6, 'Rosaceae'),
('Raisin', 1, 'Fruit en grappes, utilisé pour le vin, le jus ou consommé frais.', 'raisin', '09', '10', 3, 5, 'Vitaceae'),
('Tomate', 2, 'Fruit rouge, base de nombreuses recettes méditerranéennes.', 'tomate', '07', '09', 3, 3, 'Solanaceae'),
('Fraise', 1, 'Petit fruit rouge sucré et parfumé, apprécié en dessert.', 'fraise', '05', '07', 2, 2, 'Rosaceae'),
('Framboise', 1, 'Baie rouge acidulée, idéale en pâtisserie et confitures.', 'framboise', '06', '09', 2, 3, 'Rosaceae'),
('Pomme de terre', 2, 'Tubercule polyvalent, utilisé en purée, frites, gratin.', 'patate', '08', '10', 2, 6, 'Solanaceae'),
('Radis', 2, 'Petit légume croquant, consommé cru.', 'radis', '04', '06', 2, 2, 'Brassicaceae'),
('Chou', 2, 'Légume-feuille utilisé en soupe, salade ou fermenté.', 'chou', '09', '02', 2, 5, 'Brassicaceae'),
('Aubergine', 2, 'Légume violet, idéal pour les gratins et ratatouilles.', 'aubergine', '07', '09', 3, 3, 'Solanaceae'),
('Butternut', 2, 'Courge douce et sucrée, parfaite en soupe ou gratin.', 'butternut', '09', '11', 3, 7, 'Cucurbitaceae'),
('Navet', 2, 'Légume-racine au goût doux, utilisé en pot-au-feu.', 'navet', '10', '04', 2, 4, 'Brassicaceae'),
('Salade', 2, 'Feuilles vertes croquantes, base des entrées fraîches.', 'salade', '04', '10', 2, 2, 'Asteraceae');