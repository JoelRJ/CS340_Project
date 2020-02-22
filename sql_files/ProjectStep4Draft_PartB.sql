-- Author: Joel Johnson & Luis Renteria
-- Date: 2/22/2020
-- Website: http://web.engr.oregonstate.edu/~renteril/CS340_Project/index.html


-- Trainer Pokemon Index Table
INSERT INTO trainers_pokemon (trainer, pokemon)
    VALUES (:trainerInput, :pokemonInput);

UPDATE trainers_pokemon 
    SET trainer = :trainerInput, Pokemon = :pokemonInput
    WHERE id = :rowID;
    
DELETE FROM trainers_pokemon WHERE id = :rowID;

-- Attacks Table
INSERT INTO attacks (description)
    VALUES (:attackInput);
    
-- Defenses Table
INSERT INTO defenses (description)
    VALUES (:defenseInput);
