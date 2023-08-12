# Create base image
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm
WORKDIR /user/src/app

# Install dependencies
FROM base AS install-dependencies
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

# Create a build
FROM base AS create-build
COPY --from=install-dependencies /user/src/app ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build
USER node

# Run the application
FROM base AS run
COPY --from=install-dependencies /user/src/app/node_modules ./node_modules
COPY --from=create-build /user/src/app/dist ./dist
COPY package.json ./
CMD ["pnpm", "start:prod"]