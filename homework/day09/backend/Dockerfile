FROM node:14

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/

WORKDIR /myfolder/
RUN yarn

COPY . /myfolder/

# 3. 도커안에서 index.js 실행시키기
CMD yarn dev
# RUN mkdir qqq  => 이미지를 저장할 때 이 명령어까지 실행해서 저장한다.
# CMD mkdir qqq  => 이미지가 저장되고 실행된다. 보통 프로그램을 시킬 때 쓴다. 파일에서 한 번 밖에 못씀