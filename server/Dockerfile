FROM node:20-alpine

ARG PACKAGE_JSON_PATH
ARG PRISMA_FOLDER_PATH
WORKDIR /server

COPY $PACKAGE_JSON_PATH ./

RUN npm install

EXPOSE 3000

CMD sh -c "npx prisma generate && npm run start:dev"