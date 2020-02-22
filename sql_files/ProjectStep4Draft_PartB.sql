-- Author: Joel Johnson & Luis Renteria
-- Date: 2/22/2020
-- Website: http://web.engr.oregonstate.edu/~renteril/CS340_Project/index.html

-- ---------------------------
-- Trainer Pokemon Index Table

-- Fill table SELECT
SELECT id, trainers.name AS "Trainer", pokemon.name AS "Pokemon" FROM trainers_pokemon
	JOIN pokemon ON pokemon.pokemonID = trainers_pokemon.pokemonID
    JOIN trainers ON trainers.trainerID = trainers_pokemon.trainerID

-- Trainer drop-down menu
SELECT name FROM trainers;

-- Pokemon drop-down menu
SELECT name FROM pokemon;

-- Insert button
INSERT INTO trainers_pokemon (trainer, pokemon)
    VALUES ((SELECT trainerID FROM trainers WHERE name = :trainerInput), (SELECT pokemonID FROM pokemon WHERE name = :pokemonInput);
    
-- Update button
UPDATE trainers_pokemon 
    SET trainer = :trainerInput, Pokemon = :pokemonInput
    WHERE id = :rowID;

-- Delete button
DELETE FROM trainers_pokemon WHERE id = :rowID;

-- ---------------------------
-- Attacks Table
SELECT * FROM attacks;

INSERT INTO attacks (description)
    VALUES (:attackInput);

-- ---------------------------
-- Defenses Table
SELECT * FROM defenses;

INSERT INTO defenses (description)
    VALUES (:defenseInput);
