FROM node:lts-alpine

WORKDIR /app

#COPY package*.json ./app
#COPY build ./build
COPY . /app

RUN yarn install --frozen-lockfile --production

#EXPOSE 5000

#RUN yarn dev
