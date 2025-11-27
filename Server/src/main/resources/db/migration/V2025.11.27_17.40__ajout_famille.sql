CREATE TABLE famille (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);


ALTER TABLE demeter.plant ADD famille_id INT;
-- Puis continuer normalement
INSERT INTO famille (name)
SELECT DISTINCT famille FROM plant WHERE famille IS NOT NULL;

-- Reste des étapes identiques...
UPDATE plant
SET famille_id = f.id
    FROM famille f
WHERE plant.famille = f.name;
ALTER TABLE plant ADD CONSTRAINT fk_plant_famille FOREIGN KEY (famille_id) REFERENCES famille(id);

ALTER TABLE plant DROP COLUMN famille;
