FROM node:current-alpine

RUN mkdir -p /usr/src/app

COPY / /usr/src/app

WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 3000

CMD npm start
#10.224.187.53:5100/get_stock:v29
#get_stock-deployment.yaml