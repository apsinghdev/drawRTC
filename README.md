# drawRTC : A Real-Time Drawing app.

A real-time collaboration project to draw with your friends.

![Collaboration Demo](./collaboration.gif)

## Demo
(click on the thumbnail below)

[![Demo video](./demoVideoThumbnail.jpeg)](https://youtu.be/HuAL1eiMnSw)

### Note

> Unfortunately, Vercel's free plan does not support WebSocket functionality, so I was unable to deploy the backend to production. To use the collaborative features of the app, you'll need to set up the application locally. The setup steps are provided below, and I've also included a demonstration video of the local setup process above. Thank you!

## Instructions

### Set Up the Project Locally

#### If you are cool like me, then set up using docker

1. Run `docker-compose build` in the root directory of the project
2. Once build is successful, run `docker-compose up -d`
3. Now your frontend would be running on `localhost:5173` and backend on `localhost:8000`
4. Enjoy drawing !

#### Set Up manually

1. cd into the api folder `cd api`
2. install dependencies `npm install`
3. then cd into the client `cd client`
4. install dependencies `npm install`

In order to start drawing, execute these commands.

first start the server

1. `cd api`
2. `npm run server`

then start the client

1. `cd client`
2. `npm run dev`
3. go to `http://localhost:5173/`
4. draw and have fun!

Crafted by [Ajeet](https://x.com/ajeetunc)
