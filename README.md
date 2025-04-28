# PA-Article-API

A small article based API that allows basic interactions to retrieve a list of articles, an individual article and add an article to the database.

## Tech choices

- TypeScript
- Express
- PostgreSQL
- Jest
- Swagger
- Docker

## How to run

### Requirements
- Node (minimum v21.6.0)
- TypeScript
- npm or yarn
- Docker (including Docker Compose)
- an IDE

### Instructions

1. Clone this repo to your machine by using ` git clone https://github.com/Eleaha/PA-Article-API.git `

2. Use the command `npm i` to install dependencies.

3. Create an file called .env in the root directory with the following content to configure the connection to the dockerised database instance:
```
POSTGRES_DB="pa-article-api"
POSTGRES_HOST="localhost"
POSTGRES_PASSWORD="postgres"
POSTGRES_PORT=5433
POSTGRES_USER="postgres"
```

5. Make sure docker is installed and running, and run the command `docker compose up -d` to spin up a database instance.

6. Run `npm run seed-db` to seed the database, then `npm run listen` to start the server - click the link in the terminal (or http://localhost:8080/api) to go to the Swagger documentation.

### Other commands
- `npm test` - runs test suite
- `npm run reset-tables` - resets tables
- `npm run seed-db` - rebuilds tables and seeds data
- `npm run db-connect` - connects to the dockerised psql database
- `npm run listen` - starts nodemon and localhost server

## New Knowledge and Challenges

Overall, I treated this project as a chance to use tech I've been meaning to explore for a while, but that came with the challenge of finding out cool features and applications, but would only make sense in larger projects.

### Docker

Docker is a technology I've been wanting to learn for a while, and with this being a simple project it seemed like a good starting point to familiarise myself with this tech and figure out what it can do.

While double checking database connection best practices, I came across an article that suggested running PSQL within a docker container rather than hosting the database locally, and this seemed like a great starting point. I ran a couple of commands to spin up a database instance within a docker container, then attempted to connect to the database instance via the CLI, however, I kept getting a password authentication error. After some digging and troubleshooting using articles, docs and chatGPT to help me interpret the errors, I found in a github issues thread that it was my local instance of PSQL and the containerised version both trying to run on the same port, failing silently and causing the authentication error. I mapped a different port on the host machine to the default port on the PSQL container, it worked, and I was able to interact with the containerised instance as I would the local instance using the CLI.

I then moved onto looking at compose files, using the configuration setting for my PSQL container to create a script that would run with "docker compose up". It was pretty easy to get the script written, running, and database accessible in the command line, however, when I tried to interact with the database with table management and seed scripts in my app using .env files, the connection defaulted to my local instance again. After a little more research, I realised I needed to use the local port I mapped the default PSQL instance to, rather than the port the container was using.

I then implemented a dockerfile to attempt to automate everything up to the point of the server listen file running, when I was landing on solutions that involved custom bash scripts, I realised that in this simple case, it was probably best to stick to the simpler side and leave it at the containerised database.

Even after this little rummage and experimentation with docker, I can definitely see how in a production environment it could be an invaluable tool.

### Swagger

I've only briefly used Swagger as part of a tutorial project in C#, so integrating it into a TypeScript application was new. I started by reading a few articles and some docs to get an idea of what would work best, and landed on swagger UI and swagger Jsdoc. Unlike C#, docs for swagger can't be automatically generated based off classes and needs a library called tsoa to facilitate, which uses class architecture and decorators to automatically generate routes and documentation. I implemented basic functionality on a single controller early on and got it working, however decided that for 3 endpoints it was definitely overkill. Tsoa looks really interesting, and is something I'm looking to use for future personal projects.

I landed on using swagger-jsdocs instead, as getting the swagger documentation written in file seemed like the quickest and most straight forward way to get it written for an app this size. If this was a more complex project, I'd look at using separate files for docs, as well as for schemas.

## AI usage

I used ChatGPT, mostly to expand understanding and gain clarity on what I was reading about in documentation and articles. I didn't use it to generate any code outside of test data and parts of configuration files, but was also used in the following ways:
- Generation of test data
- Help with explaining and constructing docker configuration files
- Help to troubleshoot error messages, mostly while trying to set up the database instance with docker
- Help generating swagger tag information and formatting YAML
