let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'navalluri@gmail.com',
        pass: ''
    },
    tls: { rejectUnauthorized: false }
});
const sendMail = async (to, sub,msg) => {
    const mailOptions = {
        from: 'navalluri@gmail.com', // sender address
        to: to, // list of receivers
        subject: sub,// Subject line
        html: msg
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err);
            return false
        }
        
        else
          return true;
      });
}

module.exports = sendMail;