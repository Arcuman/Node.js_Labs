var url = require("url");
const express = require('express');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');
let fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(xmlBodyParser({}));

const PORT = 5000;
const HOST = 'localhost';

const server = app.listen(PORT, HOST, () =>
{
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
}).on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});

app.get('/getinfo', (req, res) =>
{
    console.log('------------TASK1------------');
    res.statusCode = '201';
    res.statusMessage = "Sended";
    res.setHeader("head","value");
    console.log('method: ' + req.method);
    console.log('responseCode: ' + res.statusCode);
    console.log('responseMessage: ' + res.statusMessage);
    console.log('IP: ' + res.socket.remoteAddress);
    console.log('port: ' + res.socket.remotePort)

    console.log('headers: ' );
    for (let headersKey in res.getHeaders()) {
        console.log('header: ' + headersKey +" - " + res.getHeaders()[headersKey]);
    }
    res.send("Send");

});

app.get('/xy', (req, res) =>
{
    console.log('------------TASK2------------');
    console.log('responseCode: ' + res.statusCode);
    res.end(req.query.x + ' ' + req.query.y);
});

app.post('/xys', (req, res) =>
{
    console.log('------------TASK3------------');
    console.log('responseCode: ' + res.statusCode);
    res.end(req.query.x + ' ' + req.query.y + ' ' + req.query.s);
});
app.post('/json', (req, res) =>
{
    console.log('------------TASK4------------');
    console.log("Post JSON");
    let
        {
            __comment: comment,
            x: x,
            y: y,
            s: message,
            m: array,
            o: name
        } = req.body;
    console.log('responseCode: ' + res.statusCode);
    console.log('Response. ' + comment + x + y + message + ': ' + name.surname + ' ' + name.name + array.length);

    res.json(
        {
            _comment: 'Response. ' + comment,
            x_plus_y: x + y,
            concat_s_o: message + ': ' + name.surname + ' ' + name.name,
            length_m: array.length
        });
});

app.post('/xml', (req, res) =>
{
    console.log('------------TASK5------------');
    let xml = req.body;
    res.setHeader('Content-Type', 'text/xml');
    let sum = 0;
    let text = '';
    xml.request.x.forEach(x => sum += Number(x.$.value));
    xml.request.m.forEach(m => text += m.$.value);
    let responseText = `
        <res="${xml.request.$.id}">
        <sum element="x" result="${sum}"></sum>
        <text element="m" result="${text}"></text>
        </res>`;
    console.log(responseText.toString());
    console.log("Xml parsed");
    res.end(responseText);
});
app.post('/txt', (req, res) =>
{
    console.log('------------TASK6------------');
    let dat = '';

    req.on('data', chunk => {
        dat += chunk;
    });
    req.on('end', () => {

        res.writeHead(200, {'Content-Type': 'text/plain'});
        console.log(dat);
        res.end(dat);
    });
});

app.post('/png', (req, res) =>
{
    console.log('------------TASK7------------');
        res.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});
        let png = '';
        req.on('data', (chunk) =>
        {
            png+= chunk.toString('utf8');
            res.end(png);
        });
});

app.get('/getfile', (req, res) =>
{
    console.log('------------TASK8------------');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    console.log("File send");
    res.sendFile(__dirname + '/files/f.txt');
});