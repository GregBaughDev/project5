INSERT INTO users (email,password) VALUES 
('juancarlos@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay'),
('gregBaughDev@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay'),
('rhys@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay');


INSERT INTO ratings (user_id, rating, movie_id) VALUES 
('1', '8', '451048'),
('1', '9', '436969'),
('1', '1', '550988'),
('2', '1', '451048'),
('2', '5', '436969'),
('2', '3', '550988'),
('3', '10', '451048'),
('3', '2', '436969'),
('3', '4', '550988');


INSERT INTO watchlist (movie_id, user_id) VALUES 
('451048', '1'),
('436969', '1'),
('550988', '1'),
('451048', '2'),
('436969', '2'),
('550988', '2'),
('451048', '3'),
('436969', '3'),
('550988', '3');
