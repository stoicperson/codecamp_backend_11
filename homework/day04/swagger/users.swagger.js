/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 리스트 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: aa@aa.com
 *                   name:
 *                     type: string
 *                     example: 철수
 *                   phone:
 *                     type: string
 *                     example: 010-1111-1111
 *                   personal:
 *                     type: string
 *                     example: 030101-0000000
 *                   prefer:
 *                     type: string
 *                     example: https://naver.com
 * 
 */