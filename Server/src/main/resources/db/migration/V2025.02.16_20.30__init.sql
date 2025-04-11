CREATE TABLE plant_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE besoin_soleil (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE plant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INTEGER,
    image_name VARCHAR(255),
    description VARCHAR(255),
    debut_recolte VARCHAR(2),
    fin_recolte VARCHAR(2),
    besoin_soleil_id INTEGER,
    frequence_arrosage INTEGER,
    famille VARCHAR(255),
    CONSTRAINT fk_type FOREIGN KEY (type_id) REFERENCES plant_type(id) ON DELETE CASCADE,
    CONSTRAINT fk_besoin_soleil FOREIGN KEY (besoin_soleil_id) REFERENCES besoin_soleil(id) ON DELETE CASCADE
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    role_id INTEGER,
    password VARCHAR(255),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE plant_user (
    plant_id INTEGER,
    user_id INTEGER,
    arrose TIMESTAMP,
    arrosage TIMESTAMP,
    CONSTRAINT pk_plant_user PRIMARY KEY (plant_id, user_id),
    CONSTRAINT fk_plant FOREIGN KEY (plant_id) REFERENCES plant(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
