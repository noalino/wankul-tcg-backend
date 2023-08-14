# Create base image
FROM node:18-alpine AS base
RUN npm install -g npm
RUN npm set cache ./.npm
WORKDIR /user/src/app

# Install dependencies
FROM base AS install-dependencies
COPY package*.json ./
RUN --mount=type=cache,id=npm,target=/usr/src/app/.npm npm ci
COPY . .

# Create a build
FROM base AS create-build
COPY --from=install-dependencies /user/src/app ./
RUN --mount=type=cache,id=npm,target=/usr/src/app/.npm npm run build
USER node

# Run the application in production
FROM base AS run
COPY --from=install-dependencies /user/src/app/node_modules ./node_modules
COPY --from=create-build /user/src/app/dist ./dist
COPY package.json ./
CMD ["npm", "run", "start:prod"]
USER node