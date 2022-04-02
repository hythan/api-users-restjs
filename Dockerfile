FROM node

WORKDIR /app

COPY package.json ./

RUN npm install -g npm
RUN npm install

COPY . .

