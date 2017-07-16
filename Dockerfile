FROM node:8.1

LABEL maintainer='buglight@kistriver.com'

EXPOSE 3000

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

COPY . .
