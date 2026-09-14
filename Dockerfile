FROM node:24-alpine AS dependencies
WORKDIR /site
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

FROM dependencies AS development
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM dependencies AS build
ARG ASTRO_SITE=https://sustainable-cpss.github.io
ARG ASTRO_BASE=/
ENV ASTRO_SITE=${ASTRO_SITE} ASTRO_BASE=${ASTRO_BASE}
COPY . .
RUN test -f package-lock.json && npm run ci

FROM scratch AS export
COPY --from=build /site/dist /

FROM nginx:1.29-alpine AS production
COPY --from=build /site/dist /usr/share/nginx/html
EXPOSE 80
