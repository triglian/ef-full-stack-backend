# Backend for EF Full-stack home assignment

This is the backend service for the EF Full-stack home assignment. The frontend is [ef-full-stack-frontend](https://github.com/triglian/ef-full-stack-frontend)

## Choice of stack

This was written in [Express.js](https://expressjs.com/). I didn't pick TypeScript for the backend since it's an API with a small surface and I am slightly more productive with pure JavaScript on small projects.

The database uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), a cloud offering of MongoDB. I chose MongoDB because I am familiar with it and I like the Object-like syntax which I find it a natural fit for JavaScript applications.

## API

The first version of this service was just wrapping the Picsum API. You can still find this functionality under the `api/listPicsum` route in [routes/images.js#L26](https://github.com/triglian/ef-full-stack-backend/blob/master/routes/images.js#L26).

However, since these images were relatively big in size, the user experience of loading all the images as thumbnails was degraded due to network bandwidth. Therefore, I opted to create thumbnail-sized versions of the images for normal and high pixel-density displays and serve them along the regular `download_url` of the image.

## Dev

You need to setup a `.env` file as per the example `.env.example` to configure the app with the database url, cors, etc.
You also need to seed (`npm run seed`) the database with images if you want to use custom image API.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Starts the express.js server.

#### `npm run start:dev`

Starts the express.js server in watch mode.

#### `npm run seed`

Seeds the database with images.

#### `npm run lint`

Lints the code and attempts to fix any errors.

#### `npm run format`

Uses [prettier](https://prettier.io/) to format the code.
