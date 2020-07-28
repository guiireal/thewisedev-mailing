import { MailService, MailOptions } from '../../usecase/port/mail-service'
import config from '../../config/config'
import * as nodemailer from 'nodemailer'

// todo: move credentials to a file

export class NodemailerMailService implements MailService {
  async send (options: MailOptions): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('gmailcredentials.username'),
        pass: config.get('gmailcredentials.password')
      }
    })

    try {
      await transporter.sendMail(options)
    } catch (error) {
      return error
    }
    return true
  }
}

/* Error handling:
  transport.sendMail(message, function(error, response){
  if(error){
      console.log("Error type:", error.name);
      console.log("SMTP log:", error.data);
  }
});
*/

/* Usage example:

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error); */
