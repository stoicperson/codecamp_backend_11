# 1. 운영체제 및 프로그램 설치
# FROM ubuntu:22.04

# RUN sudo apt-get install nodejs
# RUN sudo npm install -g yarn

# 1, 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn 까지 모두 깔려있는 컴퓨터 다운로드 하는 방식)

FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /myfolder/index.js

# 3. 도커안에서 index.js 실행시키기
CMD node /myfolder/index.js
# RUN mkdir qqq  => 이미지를 저장할 때 이 명령어까지 실행해서 저장한다.
# CMD mkdir qqq  => 이미지가 저장되고 실행된다. 보통 프로그램을 시킬 때 쓴다. 파일에서 한 번 밖에 못씀