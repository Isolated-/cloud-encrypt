FROM node:13-slim as build
WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:13-slim 
WORKDIR /app
COPY --from=build /app ./
CMD ["yarn", "start:prod"]