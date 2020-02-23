-- Author: Joel Johnson & Luis Renteria
-- Date: 2/22/2020
-- Website: http://web.engr.oregonstate.edu/~renteril/CS340_Project/index.html

-- ---------------------------
-- Trainer Pokemon Index Table

-- Fill table SELECT
SELECT id, trainers.name AS "Trainer", pokemon.name AS "Pokemon" FROM trainers_pokemon
	JOIN pokemon ON pokemon.pokemonID = trainers_pokemon.pokemon
    JOIN trainers ON trainers.trainerID = trainers_pokemon.trainer

-- Trainer drop-down menu
SELECT name FROM trainers;

-- Pokemon drop-down menu
SELECT name FROM pokemon;

-- Insert button
INSERT INTO trainers_pokemon (trainer, pokemon)
    VALUES ((SELECT trainerID FROM trainers WHERE name = :trainerInput), (SELECT pokemonID FROM pokemon WHERE name = :pokemonInput));
    
-- Update button
UPDATE trainers_pokemon 
    SET trainer = :trainerInput, pokemon = :pokemonInput
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


-----------------------------------------

-- POKEMON TABLE

-- View Pokemon Table (SELECT)
SELECT pokemon.name, pt1.description AS type1, pt2.description AS type2, attacks.description AS attack, 
defenses.description AS defense, pokemon.height, pokemon.weight  
FROM pokemon
    JOIN pokemonTypes pt1 ON pt1.typeID = pokemon.type1
    LEFT JOIN pokemonTypes pt2 ON pt2.typeID = pokemon.type2 
    JOIN attacks ON pokemon.attack = attacks.attackID
    JOIN defenses ON pokemon.defense = defenses.defenseID;

-- Add Trainer (INSERT)
INSERT INTO pokemon
  (name, type1, type2, attack, defense, weight, height) 
VALUES 
  (:nameInput, 
    (SELECT typeID FROM pokemonTypes WHERE description = :type1Input), 
    (SELECT typeID FROM pokemonTypes WHERE description = :type2Input),
    (SELECT attackID FROM attacks WHERE description = :attackInput),
    (SELECT defenseID FROM defenses WHERE description = :defenseInput),
    :weightInput,
    :heightInput);

-- Search Pokemon (Drop Down - SELECT)
SELECT * FROM pokemon WHERE pokemonID = :rowID;

-- Make 'attack' Attribute NULL (UPDATE)
UPDATE pokemon
    SET attack = NULL
    WHERE pokemonID = :rowID;

-----------------------------------------

-- TRAINER TABLE

-- View Trainer Table (SELECT)
SELECT * FROM trainers;

-- Add Trainer (INSERT)
INSERT INTO  trainers
  (name, gender, age) 
  VALUES 
  (:nameInput, :genderInput, :ageInput);

-- Remove Trainer (DELETE)
DELETE FROM trainers WHERE trainerID = :rowID;

-----------------------------------------

-- BATTLE TABLE

-- View Battle Table (SELECT)
SELECT battles.battleID, t1.name AS winner, t2.name AS loser
FROM battles
    JOIN trainers t1 ON battles.winner = t1.trainerID
	JOIN trainers t2 ON battles.loser = t2.trainerID;


-- Add Winner and Loser (INSERT)
INSERT INTO battles
  (winner, loser) 
VALUES 
  ((SELECT trainerID FROM trainers WHERE name = :winnerInput), 
  	(SELECT trainerID FROM trainers WHERE name = :loserInput));

-- Update Winner and Loser (UPDATE)

UPDATE 
    SET winner = (SELECT trainerID FROM trainers WHERE name = :winnerInput),
        loser = (SELECT trainerID FROM trainers WHERE name = :loserInput)
    WHERE battleID = :rowID;


-----------------------------------------
-- POKEMON TYPES TABLE

-- View Pokemon Types Table (SELECT)
SELECT * FROM pokemonTypes;

-- Add Pokemon Types (INSERT)
INSERT INTO  pokemonTypes
  (description) 
VALUES 
  (:typeInput)
