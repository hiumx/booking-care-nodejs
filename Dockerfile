FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/cli @babel/core @babel/node 

COPY . . 

RUN npm run build-src

CMD [ "npm", "run", "build" ]