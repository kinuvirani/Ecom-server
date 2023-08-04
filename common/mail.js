const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'smtp',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'kiranvirani12@gmail.com',
        pass: '740756@Test'
    }
});

exports.sendEmail = async function(options, cb) {
    await transporter.sendMail({
        from: 'kiranvirani12@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    });
};
