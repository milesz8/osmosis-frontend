FROM node:18.12.1 as build

WORKDIR /app

COPY lerna.json package.json tsconfig.json yarn.lock /app/
COPY packages /app/packages/

RUN yarn
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /app
COPY --from=build /app .

EXPOSE 3000
CMD [ "yarn", "start" ]
