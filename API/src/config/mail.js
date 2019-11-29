// export default {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS
//   },
export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '0729eeeea43f91',
    pass: 'a8fc80ad9fc303'
  },

  default: {
    from: 'Luan Brandao <luanbrandao4@gmail.com>'
  }
};

// Mailtrap(dev)
