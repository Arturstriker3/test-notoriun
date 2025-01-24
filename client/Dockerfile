FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json /app/
COPY . /app/

RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile

# RUN pnpm add typescript@5.2.2

RUN pnpm build-only

FROM nginx:1.21-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80