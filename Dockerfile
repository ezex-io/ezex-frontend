FROM oven/bun:1.2 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

# Disable cypress binary installation
ENV CYPRESS_INSTALL_BINARY=0

RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build the app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release

ENV PORT=3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/.next/standalone ./
COPY --from=prerelease /usr/src/app/.next/static ./.next/static

# run the app
USER bun
ENTRYPOINT [ "bun", "server.js" ]
