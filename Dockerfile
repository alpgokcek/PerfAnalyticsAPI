
FROM node:alpine

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN chmod +x ./scripts/*

COPY . ./
CMD ["./scripts/start.sh"]