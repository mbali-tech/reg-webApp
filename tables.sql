CREATE TABLE IF NOT EXISTS towns (
    id SERIAL PRIMARY KEY,
    code VARCHAR(2) NOT NULL,
    town VARCHAR(20) NOT NULL
);

INSERT INTO towns (code, town) VALUES
('CA', 'Cape Town'),
('CJ', 'Paarl'),
('CK', 'Malmesbury'),
('CY', 'Bellville');

CREATE TABLE IF NOT EXISTS regNumbers (
    id SERIAL PRIMARY KEY,
    town_code INT NOT NULL,
    regNumber VARCHAR(10) NOT NULL,
    FOREIGN KEY (town_code) REFERENCES towns(id)
);
