import { UserService } from "./services/user.service.js"
import Token from "../models/tokenSchema.js"
import User from "../models/userSchema.js"

const userService = new UserService()

export class UserController {
  getUserList = async (req, res) => {
    const doc = await User.find({}, { pwd: 0 })
    return res.send(doc)
  }
  createUser = async (req, res) => {
    const { personal: originalPersonal, phone, prefer, email, name } = req.body
    const doc = await Token.findOne({ phone })
    if (doc) {
      if (doc.isAuth) {
        const og = await userService.getOgTag(prefer)
        const personal = userService.getEncryptedPersonal(originalPersonal)
        const user = await new User({
          ...req.body,
          personal,
          og
        }).save()
        const myTemplate = userService.getWelcomeTemplate(name)
        userService.sendTemplateToEmail(email, myTemplate)
        return res.send(user._id)
      }
    }
    res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.")
  }
}