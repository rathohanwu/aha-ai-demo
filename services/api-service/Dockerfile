FROM node:21-alpine3.18

RUN mkdir -p /app/services/api-service
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml package.json /app/
COPY ./services/api-service /app/services/api-service

WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install

WORKDIR /app/services/api-service
RUN ls /app/services/api-service
RUN pnpm build

EXPOSE 3020
ENTRYPOINT [ "npm", "start" ]
