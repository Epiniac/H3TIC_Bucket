FROM node:23

WORKDIR /app

COPY ./file-server .

RUN npm install
RUN npm install nodemon -g

CMD ["nodemon"]