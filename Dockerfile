FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "build"]

EXPOSE 3000

# TODO 2-stage build
