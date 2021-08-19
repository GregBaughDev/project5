\c cinema;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_confirmed BIT NOT NULL DEFAULT B'0',
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS ratings;

CREATE TABLE IF NOT EXISTS ratings (
    raiting_id SERIAL,
    movie_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10),
    user_id INTEGER,
    CONSTRAINT ratings_pkey PRIMARY KEY (raiting_id),
    CONSTRAINT ratings_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS watchlist;

CREATE TABLE IF NOT EXISTS watchlist(
    watch_id SERIAL,
    movie_id INTEGER NOT NULL,
    user_id INTEGER,
    CONSTRAINT watchlist_pkey PRIMARY KEY (watch_id),
    CONSTRAINT watchlist_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);