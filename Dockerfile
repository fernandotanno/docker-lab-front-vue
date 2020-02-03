FROM node:lts-alpine

LABEL maintainer="tanno.dev <fernando@tanno.dev>"

WORKDIR /app

RUN npm install -g @vue/cli

