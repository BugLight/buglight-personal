FROM node:8.1

LABEL maintainer='buglight@kistriver.com'

EXPOSE 3000

WORKDIR /usr/src/app
RUN npm i -g ember-cli
COPY package*.json ./
RUN npm i

RUN mkdir frontend && mkdir public
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm i
COPY frontend ./frontend
RUN cd frontend && ember build --prod && cp -r dist/* ../public

COPY . .
