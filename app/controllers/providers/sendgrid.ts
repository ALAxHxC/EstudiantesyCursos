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

export const sendMail = (data1: string, data2: string) => {
  return sgMail.send({
    to: ["daniel72584@gmail.com"],
    from: "daniel72584@gmail.com",
    subject: `Got it. I have your appointment scheduled on ${data2} at ${data2}. See you soon. Good-bye.`,
    html: `<stronge>Got it. I have your appointment scheduled on ${data1} at ${data2}. See you soon. Good-bye.</stronge>`
  });
}