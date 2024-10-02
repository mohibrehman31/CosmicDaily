FROM node:18-alpine AS base
WORKDIR /usr/src/app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL="/bin/sh"
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS development
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000 9229
CMD ["pnpm", "run", "dev"]

FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN mkdir -p /pnpm && \
    echo '{"global-bin-dir":"/pnpm"}' > /pnpm/.pnpmrc && \
    pnpm install -g pm2 && \
    pnpm store prune && \
    chown -R node:node .
USER node
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.json"]
