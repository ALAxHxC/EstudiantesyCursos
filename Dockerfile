
FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
CMD echo "declare module 'dotenv'" > /usr/src/app/node_modules/@types/dotenv/index.d.ts 
EXPOSE 3000
COPY . .
RUN npm run tsc
CMD node ./build/app.js  