FROM node:18-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS development
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 3000 9229
CMD ["pnpm", "dev"]

FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm install -g pm2
RUN chown -R node:node /usr/src/app
USER node
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.json"]
