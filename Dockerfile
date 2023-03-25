FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
#COPY build ./build

RUN yarn install --frozen-lockfile --production

COPY . .

#EXPOSE 5000

#RUN yarn dev