import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { checkPhone, sendTokenToSMS, getToken } from "./phone.js"

const typeDefs = `#graphql
  type Board {
    number: Int
    writer: String
    title: String
    content: String
  }
  input CreateBoardInput {
    writer: String
    title: String
    content: String
  }
  type Query {
    # fetchBoards: Board # 객체 1개 이상을 의미!
    fetchBoards: [Board] # 배열 안에 객체 1개 이상을 의미!
  }
  type Mutation {
    # createBoards(writer: String!, title: String!, content: String!): String
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(phoneNumber: String):String
  }
`

const resolvers = {
  Query: {
    fetchBoards: (parent, args, content, info) => {
      // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
      const result = [
        { number: 1, writer: "철수", title: "제목입니다~", content: "내용입니다!" },
        { number: 2, writer: "영희", title: "영희입니다~", content: "영입니다!" },
        { number: 3, writer: "훈이", title: "훈이입니다~", content: "훈입니다!" }
      ]
      // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
      return result
    }
  },
  Mutation: {
    createBoard: (_, args,) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer)
      console.log(args.createBoardInput.title)
      console.log(args.createBoardInput.content)

      // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

      // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
      return "게시물 등록에 성공하였습니다."
    },
    // 아래 api가 작동되도록 만들기 - 힌트 : 1 phone.js 2. res/res 3. 타입
    createTokenOfPhone: (_, args) => {
      const { phoneNumber } = args
      //1, 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
      const isValid = checkPhone(phoneNumber)
      if (!isValid) return "error"

      //2. 핸드폰 토큰 6자리 만들기
      const token = getToken()

      //3. 핸드폰 번호에 토큰 전송하기
      sendTokenToSMS(phoneNumber, token)
      return "토큰 발송"
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,                                                    // 모든 사이트 허용하고 싶을 때
  // cors: { origin: ["https://naver.com", "https://daum.net"] } // 특정 사이트만 지정하고 싶을 때
})

const { url } = await startStandaloneServer(server) // 4000

console.log(`🚀 Server ready at ${url}`)
