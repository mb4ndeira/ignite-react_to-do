FROM node:20-alpine

ARG PACKAGE_JSON_PATH
WORKDIR /app

COPY $PACKAGE_JSON_PATH ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]