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
    defense int(11) NOT NULL,
    weight decimal(5,2) NOT NULL,
    height decimal(5,2) NOT NULL,
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
