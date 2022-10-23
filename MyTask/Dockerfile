FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3000

COPY . ./

CMD ["npm", "run", "start"]