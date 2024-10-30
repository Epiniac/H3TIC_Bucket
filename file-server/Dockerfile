FROM node:23

WORKDIR /app

COPY ./file-server/package*.json /


RUN npm install

RUN npm install nodemon -g

COPY ./file-server .

CMD ["nodemon"]