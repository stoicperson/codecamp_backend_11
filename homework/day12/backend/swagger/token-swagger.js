/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01044445555"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 핸드폰으로 인증 문자가 전송되었습니다.
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰 인증 검사
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01044445555"
 *               token:
 *                 type: string
 *                 example: "512654"
 *     responses:
 *       200:
 *         description: 인증 성공 또는 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 */