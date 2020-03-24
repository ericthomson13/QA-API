# Questions and Answers API Microservice

This is an API microservice that was built to support the Questions and Answers Section of the JET Productions Ecommerce site.

The repository for the front-end this was built to support can be found at:
[JET Productions Ecommerce](https://github.com/ericthomson13/JETProductions-Ecommerce)

## Getting Started

To start this project fork and then clone it.
Install necessary dependencies:
```bash
npm install
```

To run this you must have [PostgreSQL](https://www.postgresql.org/docs/12/tutorial.html) installed.

Once PostgreSQL is installed generate the sample data for the databases:

#### Note: It is unwise to attempt to run all these tasks at the same time depending on your computing power.

```bash
npm run generate-answers
```

```bash
npm run generate-questions
```

```bash
npm run generate-photos
```
Change dbCredentials.example.js to dbCredentials.js and ensure that it is on the .gitignore.  Update this file with the necessary PostgreSQL username, password and if desired newRelic information.

Once you have the sample CSV data generated and the credentials set up populate the database using:
```bash
npm run populate
```

With the database populated you can now use the microservice by running:

```bash
npm start
````

If you would like to do something that Shadow didn't appear to do with their Iowa Caucus application you can load test this microservice using:

```bash
npm run fire
```

You may need to adjust settings in the artillery.yml file depending on the hardware you're running this on.
The load testing is currently set up to run on and approach but not crash:
  MacBook Pro
    2.4GHz Quad-Core Intel Core i5 Processor
    16GB 2133 MHz LPDDR3 RAM
    macOS Catalina v10.15.3
