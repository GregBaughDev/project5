# Cinema Database

The Cinema Database stores the information of our community of moviegoers, where user information and movie ratings are stored.

## Users

This table stores the users registered in the application

| Field | Type | Description |
|---|---|---|
| user_id | SERIAL PRIMARY KEY | Unique user identifier |
| email | VARCHAR(200) | Email used for login |
| password | VARCHAR(100) | password to enter the application |
| is_confirmed | BIT | This field identifies if the user confirmed the creation of the account. 0 by default: no confirmation, 1 confirmed |

## Ratings

This table stores the movies that have been rated by registered users.

| Field | Type | Description |
|---|---|---|
| raiting_id | SERIAL PRIMARY KEY | Unique rating identifier |
| movie_id | INTEGER | Movie identifier delivered by the movie database API |
| rating | INTEGER | Value between 1 and 10 |
| user_id | INTEGER FOREING KEY | Unique user identifier |

## Watch List

| Field | Type | Description |
|---|---|---|
| raiting_id | SERIAL PRIMARY KEY | Unique rating identifier |
| movie_id | INTEGER | Movie identifier delivered by the movie database API |
| rating | INTEGER | Value between 1 and 10 |
| user_id | INTEGER FOREING KEY | Unique user identifier |

.
