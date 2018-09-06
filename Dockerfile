FROM node:8.11

RUN mkdir /app

add gwssi-ui-dev.tar /app/

WORKDIR /app

CMD ["npm", "run", "dev"]