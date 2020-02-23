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
    
-- b) Sample Data
INSERT INTO attacks (description)
    VALUES ("Overgrow"), ("Torrent"), ("Swarm");
    
INSERT INTO defenses (description)
    VALUES ("Curl"), ("Rough Skin"), ("Anticipate");
    
INSERT INTO trainers_pokemon (trainer, pokemon)
    VALUES ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Bulbasaur")),
    ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Pikachu")),
    ((SELECT trainerID FROM trainers WHERE name = "Ash Ketchum"), (SELECT pokemonID FROM pokemon WHERE name = "Charizard")),
    ((SELECT trainerID FROM trainers WHERE name = "Harry Potter"), (SELECT pokemonID FROM pokemon WHERE name = "Bulbasaur")),
    ((SELECT trainerID FROM trainers WHERE name = "Felecia Ridge"), (SELECT pokemonID FROM pokemon WHERE name = "Pikachu"));
