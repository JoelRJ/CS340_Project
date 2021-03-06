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
