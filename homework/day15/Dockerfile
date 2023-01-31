FROM node:14

COPY ./package.json /min/
COPY ./yarn.lock /min/

WORKDIR /min/

RUN yarn

COPY . /min/

CMD yarn start:dev