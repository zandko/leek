FROM node:lts-slim AS builder

WORKDIR /usr/src/app

RUN yarn config set registry https://registry.npmmirror.com/

RUN apt-get update -y && apt-get install -y openssl

COPY package.json yarn.lock ./
RUN yarn install --cache-folder .yarn-cache --network-timeout 600000 && rm -rf .yarn-cache

COPY . .
RUN yarn prisma:generate
RUN yarn build

RUN yarn install --production --network-timeout 600000 && yarn cache clean

FROM node:lts-slim

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

ARG ENV=production
ENV NODE_ENV=${ENV}

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/prisma ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env.${ENV} ./.env.${ENV}

EXPOSE 9000

CMD ["node", "dist/main"]
