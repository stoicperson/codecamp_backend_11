FROM node:18

COPY ./package.json /min/
COPY ./yarn.lock /min/

WORKDIR /min/

RUN yarn

COPY . /min/

CMD yarn dev