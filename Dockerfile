# ---------- BUILD STAGE ----------
FROM node:26.7.0-bookworm-slim AS build_stage

WORKDIR /opt/angular-app

COPY ./package*.json .

# install the versions from package-lock.json
RUN npm ci

COPY . .

RUN npx ng build --configuration production

# ---------- DEPLOYMENT STAGE ----------
FROM nginx:1.31.4-alpine AS deployment_stage

WORKDIR /usr/share/nginx/html/

# copy the server config to the proper nginx folder
COPY server.conf /etc/nginx/conf.d/default.conf

# copy the build files
COPY --from=build_stage /opt/angular-app/dist/inkwell-front-end/browser/* .

# Expose the nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
