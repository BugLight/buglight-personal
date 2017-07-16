# buglight-personal
This repository contains sources for my personal web page.

## How to run locally
### Docker
This is the easiest way.
1. Install Docker and Docker-compose
2. Configure environment `cp app.env.example app.env`
3. Run `docker-compose up --build`
4. [localhost](http://localhost)

### Without Docker
1. Install node.js
2. Install dependencies `npm i`
3. As in previous guide configure environment
4. You need to run mongodb locally (don't forget to change db host in `app.env`)
5. Run `npm start`
6. [localhost:3000](http://localhost:3000)
