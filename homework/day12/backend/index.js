import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import "dotenv/config"

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js"

import { TokenController } from "./controllers/token.controller.js"
import { UserController } from "./controllers/user.controller.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

const userController = new UserController()
app.get('/users', userController.getUserList)
app.post('/users', userController.createUser)

const tokenController = new TokenController()
app.post('/tokens/phone', tokenController.sendTokenToSMS)
app.patch('/tokens/phone', tokenController.validateToken)

mongoose.connect('mongodb://my-mongodb:27017/mydb')
  .then(() => console.log('succeed to connect to db '))
  .catch(() => console.log('failed to connect to db'))

app.listen(3000)