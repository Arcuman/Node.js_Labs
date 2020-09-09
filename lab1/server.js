let http = require('http');
let url = require('url');

function getHeaders(headers){
    let result = "";
    for(let head in headers){
        result+="<p>"+head+ " : " + headers[head] +"</p>";
    }
    return result;
}

function getParams(reqUrl){
    let result = "";
    let urlParse = url.parse(reqUrl,true);
    return urlParse.query.test ? urlParse.query.test : "No param Test";

}

 http.createServer(function (req,res){
        if(req.method === "GET") {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("<h1>Hello World from GET</h1>"+
                            "<h2>Info about req:</h2>"+
                            "<p>Method: "+req.method + "</p>"+
                            "<p>URL: "+ req.url + "</p>" +
                            "<p>Version: "+ req.httpVersion + "</p>"+
            "<p>Headers: " + getHeaders(req.headers) + "</p>");
        }
        else if(req.method === "POST")
        {

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("<h1>Hello World from POST</h1>"+
                            "<h2>Info about req:</h2>"+
                            "<p>Method: "+req.method + "</p>"+
                            "<h2>"+"Params:" + getParams(req.url) +"</h2>");
        }
}).listen(1337,'127.0.0.1');
