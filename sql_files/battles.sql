INSERT INTO battles
  (winner, loser) 
VALUES 
  ((SELECT trainerID FROM trainers WHERE name = 'Ash Ketchum'), (SELECT trainerID FROM trainers WHERE name = 'Hasty Bogey')),
  ((SELECT trainerID FROM trainers WHERE name = 'Audre Harberer'), (SELECT trainerID FROM trainers WHERE name = 'Waring Casero')),
  ((SELECT trainerID FROM trainers WHERE name = 'Izzy Taylor'), (SELECT trainerID FROM trainers WHERE name = 'Dale Spencer')),
  ((SELECT trainerID FROM trainers WHERE name = 'John Howard'), (SELECT trainerID FROM trainers WHERE name = 'Colt Steele')),
  ((SELECT trainerID FROM trainers WHERE name = 'Corby Woolforde'), (SELECT trainerID FROM trainers WHERE name = 'Shandra Amdtsen'));