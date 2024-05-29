FROM node:21.6.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 5173

CMD ["npm", "run", "dev"]