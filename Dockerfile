FROM node:24-alpine AS dependencies
WORKDIR /site
COPY package*.json ./
RUN npm install --no-audit --no-fund

FROM dependencies AS development
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM dependencies AS build
COPY . .
RUN npm run ci

FROM nginx:1.29-alpine AS production
COPY --from=build /site/dist /usr/share/nginx/html
EXPOSE 80
