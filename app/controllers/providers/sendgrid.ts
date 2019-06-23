const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMessageForgetPassword = (user: any) => {
  try {
    return sgMail.send({
      to: user.username,
      from: process.env.EMAIL_FROM,
      subject: process.env.SUBJECT,
      html: `<strong>You new password is: ${user.password} </strong>`,
    });
  } catch (error) {
    throw (error)
  }
}
