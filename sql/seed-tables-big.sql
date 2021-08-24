INSERT INTO users (email,password, is_confirmed) VALUES 
('juancarlos@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('gregBaughDev@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('rhys@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('admin@admin', '$2a$10$tgI82B5nyLhHpqPZdCiG5eluUG3DWj7fCtKSTGyMxh.SVvY.mpB/y', b'1');

INSERT INTO ratings (user_id, rating, movie_id) VALUES 
('1', '8', '451048'),
('1', '9', '436969'),
('1', '1', '550988'),
('2', '1', '451048'),
('2', '5', '436969'),
('2', '3', '550988'),
('3', '10', '451048'),
('3', '2', '436969'),
('3', '4', '550988'),
('4', '10', '436969'),
('4', '3', '451048'),
('4', '3', '550988'),
('4', '7', '497698'),
('4', '7', '706972'),
('4', '5', '508943'),
('4', '4', '379686'),
('4', '1', '385128'),
('4', '8', '459151'),
('4', '2', '482373'),
('4', '9', '776503'),
('4', '5', '602223'),
('4', '5', '635302'),
('4', '7', '675024'),
('4', '3', '573164'),
('4', '3', '520763'),
('4', '3', '637649'),
('4', '8', '675445'),
('4', '8', '581644'),
('4', '4', '617502'),
('4', '6', '659940');

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

