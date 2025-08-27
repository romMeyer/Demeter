CREATE TABLE recette (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredient VARCHAR(255),
    description VARCHAR(255),
    plant_id INTEGER,
    CONSTRAINT fk_plant FOREIGN KEY (plant_id) REFERENCES plant(id) ON DELETE CASCADE
);

INSERT INTO recette (name, ingredient, description, plant_id) VALUES
('Tarte au citron', 'Pâte sablée, citrons, sucre, œufs, beurre',
'Préparer une crème au citron avec le jus et les zestes. Garnir la pâte précuite et laisser refroidir.', 1),
('Limonade maison', 'Citrons, eau gazeuse, sucre, glaçons',
'Presser les citrons, mélanger avec de l’eau gazeuse et du sucre. Servir bien frais avec des glaçons.', 1),
('Poulet rôti au citron', 'Poulet, citrons, ail, huile d’olive, herbes',
'Mariner le poulet avec du jus de citron et de l’ail, puis le faire rôtir au four.', 1),

-- Orange (id=2)
('Salade d’orange à la cannelle', 'Oranges, cannelle, miel',
'Éplucher les oranges, les couper en rondelles et arroser de miel. Saupoudrer légèrement de cannelle.', 2),
('Gâteau à l’orange', 'Farine, sucre, œufs, jus et zestes d’orange',
'Mélanger les ingrédients, verser dans un moule et cuire jusqu’à obtenir un gâteau moelleux.', 2),
('Canard à l’orange', 'Canard, oranges, miel, sauce soja',
'Rôtir le canard puis préparer une sauce sucrée à base de jus d’orange et de miel.', 2),

-- Carotte (id=3)
('Purée de carottes', 'Carottes, beurre, crème, sel, poivre',
'Cuire les carottes à la vapeur, les mixer et ajouter beurre et crème pour une texture onctueuse.', 3),
('Carottes râpées', 'Carottes, jus de citron, huile d’olive, persil',
'Râper les carottes crues, assaisonner avec du citron et de l’huile. Parsemer de persil frais.', 3),
('Soupe carotte-cumin', 'Carottes, oignon, cumin, bouillon',
'Faire revenir l’oignon, ajouter les carottes et le cumin, puis couvrir de bouillon et mixer.', 3),

-- Mirabelle (id=4)
('Tarte aux mirabelles', 'Pâte brisée, mirabelles, sucre, crème',
'Disposer les mirabelles dénoyautées sur la pâte, saupoudrer de sucre et ajouter un peu de crème avant cuisson.', 4),
('Confiture de mirabelles', 'Mirabelles, sucre, jus de citron',
'Cuire les mirabelles avec le sucre et le citron, puis mettre en pots stérilisés.', 4),
('Clafoutis aux mirabelles', 'Mirabelles, œufs, lait, farine, sucre',
'Préparer une pâte liquide, ajouter les mirabelles et cuire jusqu’à obtenir un clafoutis doré.', 4),

-- Raisin (id=5)
('Salade de raisins et fromage', 'Raisins, fromage bleu, noix, mâche',
'Mélanger les raisins frais avec du fromage, des noix et de la mâche. Assaisonner légèrement.', 5),
('Chutney de raisin', 'Raisins, vinaigre, sucre, épices',
'Cuire doucement les raisins avec sucre, vinaigre et épices jusqu’à obtenir une sauce épaisse.', 5),
('Jus de raisin maison', 'Raisins, sucre, eau',
'Écraser les raisins, filtrer le jus et ajouter un peu de sucre. Servir frais.', 5),

-- Tomate (id=6)
('Salade Caprese', 'Tomates, mozzarella, basilic, huile d’olive',
'Couper les tomates et la mozzarella en tranches, alterner avec des feuilles de basilic et assaisonner.', 6),
('Sauce tomate maison', 'Tomates, ail, oignon, herbes, huile d’olive',
'Faire revenir l’ail et l’oignon, ajouter les tomates concassées et laisser mijoter 30 minutes.', 6),
('Tomates farcies', 'Tomates, viande hachée, riz, oignon, herbes',
'Évider les tomates et les remplir d’un mélange de viande, riz et herbes. Cuire au four.', 6),

-- Fraise (id=7)
('Tarte aux fraises', 'Pâte sablée, fraises, crème pâtissière',
'Cuire la pâte à blanc, étaler la crème pâtissière puis disposer les fraises coupées.', 7),
('Smoothie fraise-banane', 'Fraises, banane, yaourt, miel',
'Mixer les fruits avec le yaourt et le miel pour un smoothie onctueux.', 7),
('Confiture de fraises', 'Fraises, sucre, citron',
'Faire cuire les fraises avec le sucre et le jus de citron, puis mettre en pots.', 7),

-- Framboise (id=8)
('Sorbet framboise', 'Framboises, sucre, jus de citron',
'Mixer les framboises avec le sucre et le jus de citron, puis congeler en remuant régulièrement.', 8),
('Tiramisu framboise', 'Framboises, mascarpone, biscuits, œufs, sucre',
'Alterner couches de crème mascarpone et biscuits imbibés, avec des framboises fraîches.', 8),
('Coulis de framboise', 'Framboises, sucre, eau',
'Mixer les framboises avec du sucre et un peu d’eau, puis filtrer.', 8),

-- Pomme de terre (id=9)
('Purée de pommes de terre', 'Pommes de terre, beurre, lait',
'Écraser les pommes de terre cuites et ajouter lait chaud et beurre.', 9),
('Gratin dauphinois', 'Pommes de terre, crème, ail, fromage',
'Superposer des tranches de pommes de terre avec crème et fromage, puis gratiner.', 9),
('Frites maison', 'Pommes de terre, huile, sel',
'Couper les pommes de terre en bâtonnets et les frire à l’huile chaude.', 9),

-- Radis (id=10)
('Radis au beurre', 'Radis, beurre, sel',
'Servir des radis croquants avec du beurre frais et du sel.', 10),
('Salade de radis', 'Radis, concombre, vinaigrette',
'Couper les radis en rondelles, mélanger avec concombre et vinaigrette.', 10),
('Tartines radis-fromage frais', 'Pain, radis, fromage frais',
'Tartiner du fromage sur le pain et ajouter des radis en rondelles.', 10),

-- Chou (id=11)
('Choucroute maison', 'Chou, vin blanc, saucisses, pommes de terre',
'Fermenter le chou, puis cuire avec vin blanc et saucisses.', 11),
('Coleslaw', 'Chou, carottes, mayonnaise',
'Râper chou et carottes, mélanger avec une sauce crémeuse.', 11),
('Chou farci', 'Chou, viande hachée, riz, sauce tomate',
'Enrouler une farce de viande et riz dans des feuilles de chou, puis cuire en sauce.', 11),

-- Aubergine (id=12)
('Ratatouille', 'Aubergine, tomate, courgette, poivron, herbes',
'Couper les légumes en dés et les mijoter avec de l’huile d’olive et des herbes.', 12),
('Caviar d’aubergine', 'Aubergines, huile d’olive, ail, citron',
'Cuire les aubergines, les mixer avec ail, citron et huile.', 12),
('Aubergines grillées', 'Aubergines, huile, herbes',
'Trancher les aubergines, badigeonner d’huile et griller au four ou barbecue.', 12),

-- Butternut (id=13)
('Velouté de butternut', 'Butternut, bouillon, crème',
'Cuire la courge avec du bouillon, puis mixer avec un peu de crème.', 13),
('Gratin de butternut', 'Butternut, crème, fromage',
'Disposer le butternut en tranches avec crème et fromage, puis gratiner.', 13),
('Butternut rôti au miel', 'Butternut, miel, thym',
'Couper en cubes, arroser de miel et d’herbes, puis rôtir au four.', 13),

-- Navet (id=14)
('Navets glacés', 'Navets, beurre, sucre',
'Cuire les navets dans un peu d’eau, ajouter beurre et sucre pour caraméliser.', 14),
('Purée de navets', 'Navets, beurre, crème',
'Mixer les navets cuits avec beurre et crème.', 14),
('Soupe aux navets', 'Navets, bouillon, oignon',
'Faire revenir l’oignon, ajouter les navets et bouillon, puis mixer.', 14),

-- Salade (id=15)
('Salade César', 'Salade, poulet, croûtons, parmesan, sauce César',
'Mélanger les feuilles de salade avec poulet grillé, croûtons et parmesan. Arroser de sauce César.', 15),
('Salade niçoise', 'Salade, thon, œufs, tomates, olives, haricots verts',
'Mélanger tous les ingrédients avec une vinaigrette légère.', 15),
('Wraps salade-poulet', 'Salade, poulet, tortilla, sauce',
'Garnir une tortilla avec du poulet et de la salade, ajouter une sauce et rouler.', 15);