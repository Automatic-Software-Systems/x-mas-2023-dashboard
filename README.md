# NestAng Starter

_A Starter Template for full-stack Typescript projects utilizing Angular & NestJs_

**Note:** This project was only started in May 2023 and some functionality is still in progress, but that has been
noted below in this `README`.

<img src="https://github.com/patrickstracey/NestAng-Starter/assets/8172098/c585bf4f-3512-4975-9564-0a38f25f6331"  width="600">

## About

This template repo aims to give you an initial fullstack scaffold for a project utilizing Angular on the front-end and
NestJs on the back-end. Given that NestJs took a lot of inspiration from Angular, I find that these two together feel
like almost a single cohesive framework across the entire stack. They are both great projects maintained by great teams
who also write outstanding documentation.

Currently it is meant for one-backend and one front-end and I have therefore kept the `package.json` for each separate,
but I have used this stack successfully in a multi-app monorepo using [Nx](https://nx.dev/).

There are also some READMEs with additional context for their respective areas in the `backend`, `frontend`,
and `mock_data/mongo_seeds` directories.

### The Stack

| Front-end                                                          | Back-end                                  | Database                                                            | Email                                                                                                  | Upload Storage                                      | Deployment                                     |
|--------------------------------------------------------------------|-------------------------------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------------------------------|
| [Angular 16](https://angular.io/)                                  | [NestJs 10](https://nestjs.com/)          | [MongoDB](https://www.mongodb.com/)                                 | [Sendgrid](https://sendgrid.com/)                                                                      | [Google Cloud Storage](https://cloud.google.com/)   | [Render](https://render.com/)                  |
| [Official Docs](https://angular.io/guide/developer-guide-overview) | [Official Docs](https://docs.nestjs.com/) | [Official Docs](https://www.mongodb.com/docs/drivers/node/current/) | [Official Docs](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication) | [Official Docs](https://cloud.google.com/storage)   | [Official Docs](https://render.com/docs/#node) |
| [Implemented](frontend/README.md)                                  | [Implemented](backend/README.md)          | [Implemented](backend/src/database/README.md)                       | [Implemented](backend/src/mail/README.md)                                                              | [Implemented](backend/src/routes/uploads/README.md) | Not Yet Implemented                            |     |

## Context

I have done a few projects with this stack now and found myself re-writing certain items in each one, so this repo
stemmed from the desire to have a starting point that cut out some of that shared setup. As of today it aims to provide
you with:

- Login, Signup, and Reset Password Functionality with the needed email support
    - _The email pieces have been implemented with a standard Sendgrid setup I have come to use, but you will want to
      build you own project specific email templates._
- Some basic styling and UI components
    - _I tried to avoid making the styles too overbearing so that you are able to remove them in favor of a css library
      like
      Tailwind is you would prefer._
- Simple Authentication implementation
    - _Again you are encouraged to another authentication provider or library that you like, this is a password and
      email
      implementation stored on a users table which has suited my starting needs_
- The ability to initialize, connect to, and seed a Mongo database
- Signup, Invite, and Password Reset emails via Sendgrid
- Image and PDF uploads via Google Cloud Storage
- JWT tokens and Cookies (including refesh endpoint and auto login functionality)
- Auth guards, route decorators, and interceptors
- Account & Dashboard page
- ACL management.

### What Is Not Yet Implemented (as of 11/23/23)

I have used these services and built these features in multiple projects before and so my hope is that I will be able to
get to adding these fairly quickly, but at the moment the project still needs the following items added:

- Deployment scripts and configs, I use Render but these should be usable with any comparable hosting provider
- An Admin Portal

### Database

I tend to start projects with MongoDB since I think their Atlas and Compass offerings are great and the nature of NoSQL
gives you some quick flexibility while prototyping. With Typescript's strict typing option I have found myself not using
popular ORM
frameworks like [Mongoose](https://mongoosejs.com/docs/) but I know they have become standard for many, my hope is that
Mongoose would be easy for you to add to this scaffold.

If you would like to read up more on how to setup and seed a MongoDB with this
project [checkout the README](mock_data/mongo_seeds/README.md) in the `mock_data/mongo_seeds` directory.

You can also read up on the `DatabaseModule` and how to configure it for
a [different provider here](backend/src/database/README.md).

## FAQ

**Some of this code seems a bit messy?**

Yes it is probably not all ideal so I am planning to clean it up and standardize functionality in the weeks ahead, as of
writing this the project is only three days old and a lot of the base items were pulled from projects that I was trying
to build quickly as a solo dev.

Additionally, I often prefer readability over the small gains in performance or formatting that more advanced methods
might give you. I find that clearly stating a result variable even when you can simply return the result of a function
is often easier for newer developers to understand and quick onboarding time is important to me.

**This is using Mongo but I prefer SQL.**

Hey I like SQL too, and my hope is to add a SQL solution to this project in the future so that those who use it can
quickly configure their `DatabaseModule` to use the solution they prefer. You can read up on the `DatabaseModule` and
how to configure it for
a [different provider here](backend/src/database/README.md).

**Why the Commitment to certain providers?**

These are just what I have personally used in projects with success and have found them all very easy to learn and
onboard into. If you have your own preferences I hope the scaffolded services in this project allow you to easily switch
to your chosen provider. For deployment I have found services like AWS, Azure, and Google Cloud to be great, but they
are quite intimidating and probably overkill for MVP deployments if you don't already know them super well.

## Sharing & Making Changes

Please feel free to copy or fork this repo for your own use if you would like to hack away at it to create your own
starter Angular/NestJs template with different providers. I have just put this up because I found myself recreating the
same proxy configs, routes, and general services across multiple projects and I hope that maybe this can help you save
the time it is saving me for your future projects.


# Development

## Run Mongo as Docker
```
docker-compose -f mongo-deb-db.yml up
```

```
docker-compose -f mongo-deb-db.yml start
```

```
docker-compose -f mongo-deb-db.yml stop
```

```
docker-compose -f mongo-deb-db.yml down
```