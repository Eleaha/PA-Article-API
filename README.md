# PA-Article-API

A small article based API that allows users basic interactions to retrieve a list of articles,an individual article and add an article.

## Tech choices

- Typescript
- Express
- PostgreSQL
- Jest
- Swagger
- Docker

## How to run

### Requirements

- Docker
- an IDE

### Instructions

open you ide with docker installed, and run the command docker compose up --build. You should see a link to the locally hosted address for the Swagger UI docs for the application.

Other commands are:

## New Knowledge and Challenges

Overall, I treated treated this as a chance to explore tech I'd been meaning to for a while, but that came with the main challenge of finding out loads of cool features and ways it could be applied to larger applications, but don't make sense for an API this small.

### Docker

Docker is a technology I've been meaning to get around to learning for a while, and with this being a simple project, it seemed like a good starting point to get more familiar with this tech and sus out what it can do.

While double checking database connection best practices, I came across an article that suggested running PSQL within a docker container rather than hosting the database locally, so this was my starting point for getting going. I ran a couple of commands to spin up a database instance within a docker container, then attempted to connect to the database instance via the CLI however, I kept getting a password authentication error. After a lot of digging and troubleshooting using articles, docs and chatGPT to help me interpret the errors, I found in a github issues thread that it was that my local instance of PSQL and the containerised version were both trying to run on the same port, failing silently and causing the authentication error. I mapped a different port on the host machine to the default port on the PSQL container, it worked, and I was able to interact with the containerised instance as I would the local instance using the CLI.

I then moved onto looking at compose files, using the configuration setting for my PSQL container to create a script that would run with "docker compose up". It was pretty easy to get the script written, running and database accessible in the command line, however, when I tried to interact with the database with table management and seed scripts in my app using .env files, the connection defaulted to my local instance again. After a little more research, I realised I needed to use the port I had mapped to on my host, rather than the port exposed by the container.

### Swagger

I've only briefly used Swagger as part of a tutorial project in C#, so integrating it into a TypeScript project was new. I started by reading a few articles and dome docs to get an idea of what would work best, and landed on swagger UI and swagger Jsdoc. Unlike C#, docs for swagger can't be automatically generated based off controller class and needs a library called tsoa which uses class architecture and decorators to automatically generate routes and documentation. I implemented basic functionality on a single controller early on and got it working, however decided that for 3 endpoints it was definitely overkill. tsoa is definitely something I'd be looking to use for future personal projects.

I landed on using swagger-jsdocs instead, as getting the swagger documentation written in file seemed like the quickest and most straight forward way to get it written for an app this size. If there was much more complexity, I'd look at using separate files for docs, as well as for schemas.

## AI usage

- Generation of test data
- Used to clarify understanding on material read in docs and articles
- Help with explaining and constructing docker configuration files
- Help to troubleshoot error messages, mostly while trying to set up database instance with docker
- Help generating swagger tag information
