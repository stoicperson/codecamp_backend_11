/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 목록 가져오기
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 유저 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 김철수
 *                   email:
 *                     type: string
 *                     example: aaa@aaa.com
 *                   personal:
 *                     type: string
 *                     example: 001023-*******
 *                   prefer:
 *                     type: string
 *                     example: http://naver.com
 *                   phone:
 *                     type: string
 *                     example: 010-2222-3333
 *                   og:
 *                     type: object
 *                     properties:
 *                       title: 
 *                         type: string
 *                         example: 네이버
 *                       description: 
 *                         type: string
 *                         example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                       image: 
 *                         type: string
 *                         example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: 유저 등록하기
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 박철수
 *               email:
 *                 type: string
 *                 example: aaa@aaa.com
 *               personal:
 *                 type: string
 *                 example: 001023-11111111
 *               prefer:
 *                 type: string
 *                 example: https://naver.com
 *               pwd:
 *                 type: string
 *                 example: 1234
 *               phone:
 *                 type: string
 *                 example: "01044445555"
 *     responses:
 *       200:
 *         description: 생성된 유저 id
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 63ce07a3955109f2d872f002
 *       422:
 *         description: 핸드폰 번호가 인증되지 않음
 */