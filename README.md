# INCO Academy

## Project 5: Consume an API

### About

This project develops a movie rating platform for a local cinema.

It allows registered users to rate movies and thus create their own community score.

The site will be accessible without a user account, but unregistered visitors won’t be able to leave a rating; only logged in users will be able to do so.

The platform uses the [TheMovieDB API](https://www.themoviedb.org/documentation/api)

## Technologies used

- [] Node JS
- [] Express
- [] Postgres db
- [] EJS

## Installation

```bash
git clone https://github.com/coroto/project5.git

cd project5

npm install
```

## Database setup

Create an **.env** file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME = VALUE. To do this, take as a reference the .env.sample file found in this repository and replace it with the values from your Database.

Run the following scripts to create and feed the database with test data.

```bash
npm run create-db
```

```bash
npm run create-tables
```

```bash
npm run seed-tables
```

## Authors

**Juan Carlos Mellizo** - @Coroto

**Greg Baugh** - @GregBaughDev

**Rhys Dawson** - @hy-js

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
