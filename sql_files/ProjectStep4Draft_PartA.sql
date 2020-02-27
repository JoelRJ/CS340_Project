-- Author: Joel Johnson & Luis Renteria
-- Date: 2/22/2020
-- Website: http://web.engr.oregonstate.edu/~renteril/CS340_Project/index.html

-- a) Data Definition Queries
CREATE TABLE attacks (
    attackID int(11) NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (attackID)
    );
    
CREATE TABLE defenses (
    defenseID int(11) NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (defenseID)
    );   
    
CREATE TABLE pokemonTypes (
    typeID int(11) NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (typeID)
    );
    
CREATE TABLE pokemon (
    pokemonID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    type1 int(11) NOT NULL,
    type2 int(11),
    attack int(11) NOT NULL,
    defense int(11),
    weight int(11) NOT NULL,
    height int(11) NOT NULL,
    PRIMARY KEY (pokemonID),
    CONSTRAINT FOREIGN KEY (type1) REFERENCES pokemonTypes(typeID),
    CONSTRAINT FOREIGN KEY (type2) REFERENCES pokemonTypes(typeID),
    CONSTRAINT FOREIGN KEY (attack) REFERENCES attacks(attackID),  
    CONSTRAINT FOREIGN KEY (defense) REFERENCES defenses(defenseID)  
    );
    
CREATE TABLE trainers (
    trainerID int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    gender varchar(255) NOT NULL,
    age int(11) NOT NULL,
    PRIMARY KEY (trainerID)
    );
    
CREATE TABLE trainers_pokemon (
    id int(11) NOT NULL AUTO_INCREMENT,
    trainer int(11) NOT NULL,
    pokemon int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (trainer) REFERENCES trainers (trainerID),
    CONSTRAINT FOREIGN KEY (pokemon) REFERENCES pokemon (pokemonID)  
    );    

    
CREATE TABLE battles (
    battleID int(11) NOT NULL AUTO_INCREMENT,
    winner int(11) NOT NULL,
    loser int(11) NOT NULL,
    PRIMARY KEY (battleID),
    CONSTRAINT FOREIGN KEY (winner) REFERENCES trainers (trainerID),  
    CONSTRAINT FOREIGN KEY (loser) REFERENCES trainers (trainerID)  
    );    

-----------------------------------
    
-- b) Sample Data


-- INSERT INTO attacks (description)
-- VALUES ("Overgrow"), ("Torrent"), ("Swarm");
    
-- INSERT INTO defenses (description)
--    VALUES ("Curl"), ("Rough Skin"), ("Anticipate");

-- pokemonTypes sample data
INSERT INTO  pokemonTypes
  (description) 
VALUES 
  ('Bug'),
  ('Dark'), 
  ('Dragon'),
  ('Electric'),
  ('Fighting'),
  ('Fire'),
  ('Flying'),
  ('Ghost'),
  ('Grass'),
  ('Ground'),
  ('Ice'),
  ('Normal'),
  ('Poison'),
  ('Psychic'),
  ('Rock'),
  ('Row'),
  ('Steel'),
  ('Water');

-- attacks sample data

INSERT INTO attacks
  (description) 
VALUES 
  ('Blaze'),
  ('Flash Fire'), 
  ('Immunity'),
  ('Inner Focus'),
  ('Intimidate'),
  ('Levitate'),
  ('Overgrow'),
  ('Pressure'),
  ('Run Away'),
  ('Sand Stream'),
  ('Static'),
  ('Steadfast'),
  ('Synchronize'),
  ('Torrent');

-- defenses sample data

INSERT INTO defenses 
  (description) 
VALUES 
  ('Acid Armor'),
  ('Acupressure'), 
  ('Amnesia'),
  ('Ancient Power'),
  ('Aromatic Mist'),
  ('Barrier'),
  ('Bulk Up'),
  ('Calm Mind'),
  ('Charge'),
  ('Coil'),
  ('Comic Power'),
  ('Cotton Guard'),
  ('Defend Order'),
  ('Defense Curl'),
  ('Flower Shield'),
  ('Geomancy'),
  ('Harden'),
  ('Iron Defense'),
  ('Magnetic Flux'),
  ('Quiver Dance'),
  ('Withdraw');

-- trainers sample data

INSERT INTO  trainers
  (name, gender, age) 
VALUES 
  ('Ash Ketchum', 'male', 10),
  ('Hasty Bogey', 'male', 19),
  ('Audre Harberer', 'female', 10),
  ('Waring Casero', 'male', 26),
  ('Corby Woolforde', 'male', 25),
  ('Shandra Amdtsen', 'female', 21),
  ('Felecia Ridge', 'female', 25),
  ('Jerrie Stockow', 'male', 23),
  ('Toni Darnell', 'female', 16),
  ('Colt Steele', 'male', 26),
  ('Ludwig Wittgenstein', 'male', 18),
  ('Ethelyn Congrave', 'female', 14),
  ('John Howard', 'male', 20),
  ('Shawna Davidson', 'female', 23),
  ('Juan Lopez', 'male', 14),
  ('Mickie Westover', 'male', 17),
  ('Harry Potter', 'male', 12),
  ('Rowan July', 'female', 17),
  ('Way Fryers', 'male', 18),
  ('Caz Noe', 'male', 21),
  ('Rikki Burrage', 'male', 19),
  ('Shea Mollin', 'female', 19),
  ('Lacy Jordan', 'female', 23),
  ('Dale Spencer', 'male', 22),
  ('Izzy Taylor', 'male', 17);

  -- pokemon sample data

  INSERT INTO pokemon
  (name, type1, type2, attack, defense, weight, height) 
VALUES 
  ('Bulbasaur', 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Grass'), 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Poison'),
    (SELECT attackID FROM attacks WHERE description = 'Overgrow'),
    (SELECT defenseID FROM defenses WHERE description = 'Withdraw'),
    6.9,
    0.7),
  ('Pikachu', 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Electric'), 
    NULL,
    (SELECT attackID FROM attacks WHERE description = 'Static'),
    (SELECT defenseID FROM defenses WHERE description = 'Charge'),
    6.0,
    13.20),
  ('Charizard', 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Fire'), 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Flying'),
    (SELECT attackID FROM attacks WHERE description = 'Blaze'),
    (SELECT defenseID FROM defenses WHERE description = 'Barrier'),
    90.5,
    1.70),
   ('Squirtle', 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Water'), 
    NULL,
    (SELECT attackID FROM attacks WHERE description = 'Torrent'),
    (SELECT defenseID FROM defenses WHERE description = 'Aromatic Mist'),
    9,
    19.80),
   ('Eevee', 
    (SELECT typeID FROM pokemonTypes WHERE description = 'Normal'), 
    NULL,
    (SELECT attackID FROM attacks WHERE description = 'Run Away'),
    (SELECT defenseID FROM defenses WHERE description = 'Quiver Dance'),
    6.5,
    14.3);

-- battles sample data

INSERT INTO battles
  (winner, loser) 
VALUES 
  ((SELECT trainerID FROM trainers WHERE name = 'Ash Ketchum'), (SELECT trainerID FROM trainers WHERE name = 'Hasty Bogey')),
  ((SELECT trainerID FROM trainers WHERE name = 'Audre Harberer'), (SELECT trainerID FROM trainers WHERE name = 'Waring Casero')),
  ((SELECT trainerID FROM trainers WHERE name = 'Izzy Taylor'), (SELECT trainerID FROM trainers WHERE name = 'Dale Spencer')),
  ((SELECT trainerID FROM trainers WHERE name = 'John Howard'), (SELECT trainerID FROM trainers WHERE name = 'Colt Steele')),
  ((SELECT trainerID FROM trainers WHERE name = 'Corby Woolforde'), (SELECT trainerID FROM trainers WHERE name = 'Shandra Amdtsen'));


-- trainer_pokemons sample data
    
INSERT INTO trainers_pokemon (trainer, pokemon)
    VALUES ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Bulbasaur")),
    ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Pikachu")),
    ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Charizard")),
    ((SELECT trainerID FROM trainers WHERE name = "Harry Potter"), (SELECT pokemonID FROM pokemon WHERE name = "Bulbasaur")),
    ((SELECT trainerID FROM trainers WHERE name = "Felecia Ridge"), (SELECT pokemonID FROM pokemon WHERE name = "Pikachu"));
