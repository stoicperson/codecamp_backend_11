import * as cheerio from 'cheerio';
import axios from "axios"
import nodemailer from "nodemailer"

export class UserService {
  getOgTag = async (prefer) => {
    const og = {}
    const res = await axios.get(prefer)
    const $ = cheerio.load(res.data);
    $("meta").each((_, el) => {
      if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
        og[$(el).attr("property").slice(3)] = $(el).attr("content")
      }
    })
    return og
  }
  getEncryptedPersonal = (personal) => {
    return personal.slice(0, 7) + "*******"
  }
  getWelcomeTemplate = (name) => {
    const template = `
    <html>
      <body>
        <div>
          <div style="width: 500px">
            <h1>${name}님 가입을 환영합니다!!!</h1>
          </div>
        </div>
      </body>
    </html>
    `
    return template
  }
  sendTemplateToEmail = async (email, template) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let res = await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "가입을 축하합니다!!",
      html: template
    });
    console.log(res)
    console.log(email + "이메일로 가입환영템플릿" + template + "를 전송하였습니다")
  }
}