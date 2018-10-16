FROM node:8.11

RUN mkdir /app
ENV GW_INDEX "isearch"
 
add gwssi-ui-dev.tar /app/

WORKDIR /app

CMD ["npm", "run", "dev"]