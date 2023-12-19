FROM node:21-alpine3.18

RUN mkdir -p /app/clients/aha-ai-demo
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml package.json /app/
COPY ./clients/aha-ai-demo /app/clients/aha-ai-demo

WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install

WORKDIR /app/clients/aha-ai-demo
ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_CLIENT_ID
ARG NEXT_PUBLIC_REDIRECT_URL

RUN NEXT_PUBLIC_BACKEND_API_URL=${NEXT_PUBLIC_BACKEND_API_URL} \
    NEXT_PUBLIC_CLIENT_ID=${NEXT_PUBLIC_CLIENT_ID} \
    NEXT_PUBLIC_REDIRECT_URL=${NEXT_PUBLIC_REDIRECT_URL} \
    pnpm build

EXPOSE 3000
ENTRYPOINT [ "pnpm", "start" ]
