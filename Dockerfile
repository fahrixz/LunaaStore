FROM node:18

RUN apt update -y && apt upgrade -y
RUN apt-get update && \
  apt-get install -y \
  ffmpeg && \
  rm -rf /var/lib/apt/lists/*
  
COPY package.json .
COPY . .
RUN npm i -g pm2
RUN npm install
CMD pm2-runtime index.js
