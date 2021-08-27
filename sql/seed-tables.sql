INSERT INTO users (avatar, username, email, password, is_confirmed) VALUES 
('9dKCd55IuTT5QRs989m9Qlb7d2B.jpg', 'juancarlos','juancarlos@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg', 'greg','gregBaughDev@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('7p0O4mKYLIhU2E5Zcq9Z3vOZ4e9.jpg', 'rhys','rhys@gmail.com', '$2a$10$zStmwMUwTQBEBW2bI2cC5e5hiShTpXgdsGEKU4kHrhd0o1a/HAlay', b'1'),
('2HZepd18kR2UwgmdO3wjfjhtNfd.jpg', 'admin','admin@admin', '$2a$10$tgI82B5nyLhHpqPZdCiG5eluUG3DWj7fCtKSTGyMxh.SVvY.mpB/y', b'1');

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
('4', '7', '497698');

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

