FROM node:14-alpine as builder
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run-script build
