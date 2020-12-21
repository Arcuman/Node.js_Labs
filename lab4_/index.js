const express = require("express");
const DataBase = require('./database/db');
const fs = require('fs');
const data = require('./database/db')
const app = express();

let db = new data.DB();
db.on('GET',(req,res)=>{console.log('DB.GET'); res.end(JSON.stringify(db.get()))})

db.on('POST',(req,res)=>{console.log('DB.POST');
    req.on('data',data=>{
            let r = JSON.parse(data);
            db.post(r);
            res.end(JSON.stringify(r));
        }
    )})
db.on('PUT',(req,res)=>{console.log('DB.PUT');
    req.on('data',data=>{
            let r = JSON.parse(data);
            db.put(r);
            res.end(JSON.stringify(r));
        }
    )})
db.on('DELETE',(req,res)=>{console.log('DB.DELETE');
        let out = db.delete(req.query.id)
        res.end(out.toString());
    })
db.on('COMMIT',(req, res) => {console.log("DB.COMMIT");
    res.end(JSON.stringify(db.commit()));
});

app.get("/", function(request, response){
    let html = fs.readFileSync('index.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
});
app.get("/api/db", function(request, response){
    db.emit('GET',request,response);
});
app.post("/api/db", function(request, response){
    db.emit('POST',request,response);
});
app.put("/api/db", function(request, response){
    db.emit('PUT',request,response);
});
app.delete("/api/db", function(request, response){
    db.emit('DELETE',request,response);
});
app.get('/commit', (request, response) => {
    db.emit('COMMIT', request, response);
});
app.get('/api/ss', (request, response) => {
    requestVer++;
    if(finish == 0)
    {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('Сбор статистики еще не завершен');
    }
    else
    {
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify({ Start: St1, Finish: finish, request: requestVer, commit: Comm }));
    }
    console.log("Open statistic");

});
// начинаем прослушивать подключения на 5000 порту
app.listen(5000);

let requestVer = 0;
let finish = 0;
let timerIdout = 0;
let St1 = 0;
let Comm = 0;
let Stat = 0;
let timerId = 0;
let timerIdS = 0;
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>
{
        chunk = process.stdin.read();
        start = Date.now();
        let num = chunk.trim().replace(/[^\d]/g, '');
        if (chunk.trim().includes('sd')) {
            if (num !== '') {
                process.stdout.write('->process exit after ' + num + ' second\n');
            } else if (+num === 0)
                num = '';
            clearTimeout(timerIdout);
            timerIdout = setTimeout(() => process.exit(0), num * 1000);
            if (num === '') {
                process.stdout.write('->Exit timer stoped\n');
            }
        } else if (chunk.trim().includes('sc')) {
            finish = 0;
            if (num !== '') {
                St1 = (new Date()).toString().substr(3, 21);
                Comm++;
                process.stdout.write('->commit every ' + num + ' second\n');
            } else if (+num === 0)
                num = '';
            clearInterval(timerId);
            timerId = setInterval(() => {
                app.get('/commit', (request, response) => db.emit('commit', (request, response)));
                Comm++;
                process.stdout.write('COMMIT\n');
            }, num * 1000);
            timerId.unref();
            if (num === '') {
                clearInterval(timerId);
                process.stdout.write('->commit stoped\n');
                Comm--;
                finish = (new Date()).toString().substr(3, 21);
            }
        }
        else if (chunk.trim().includes('ss'))
        {
            finish = 0;
            if (num !== '') {
                St1 = (new Date()).toString().substr(3, 21);
                Stat++;
                process.stdout.write('->get statistic every ' + num + ' second\n');
            }
            else if (+num === 0)
            num = '';
            clearInterval(timerIdS);
            timerIdS = setInterval(() =>
            {
                process.stdout.write('Time:'+ (Date.now()-start)/1000 + ' Stat:' + Stat + ' Commit:' + Comm + '\n');
                Stat++;
            }, num * 1000);
            timerIdS.unref();
            if (num === '')
            {
                clearInterval(timerIdS);
                process.stdout.write('->statistic stoped\n');
                Stat--;
                finish = (new Date()).toString().substr(3, 21);
            }
        }
        else process.stdout.write('Unknow comand: ' + chunk.trim() + '\n');
});