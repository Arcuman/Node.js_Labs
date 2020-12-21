let nodemailer = require('nodemailer');

exports.send = function (message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcuman.borto@gmail.com',
            pass: 'QWEaz45@'
        }
    });

    var mailOptions = {
        from: 'arcuman.borto@gmail.com',
        to: 'anton.borisov.01@mail.ru',
        subject: 'message',
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};