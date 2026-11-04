# Projeto 3b — Frontend React.
#
# Multi-stage: Node faz o build (gera dist/), Nginx serve os arquivos estáticos.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- servir ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
