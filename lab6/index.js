const nodemailer = require('nodemailer');
const express = require('express');
const {send} = require('m0603arc');
const app = express();

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    console.log("App sendFile");
});
app.post('/send', (request, response) => {
    request.on('data', data => {
        let obj = JSON.parse(data);
        send_message(obj.message, obj.sender, obj.receiver);
    })
});
app.get('/task3', (request, response) => {
    send('task 3');
    response.end("Send");
});

app.listen(5000);

function send_message(message, sender, receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcuman.borto@gmail.com',
            pass: 'QWEaz45@'
        }
    });

    var mailOptions = {
        from: sender,
        to: receiver,
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
}