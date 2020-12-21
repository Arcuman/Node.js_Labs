const http = require("http");
const fs = require("fs");
const RPCWebSocket = require("rpc-websockets").Server;

const port = 3000;
const WS_PORT = 8001;
const HOST = "localhost";
let error_count = 0;

const socket = new RPCWebSocket({
  port: WS_PORT,
  host: HOST,
  path: "/",
});
socket.event("changed");

let get_Students = (full_path) => {
  return JSON.parse(fs.readFileSync(full_path, "utf8"));
};

let throw_error = (res, message = 0, code = 404) => {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: ++error_count, message }));
};

let DELETE_handler = (req, res) => {
  let full_path = "./static/students.json";
  let student_id = req.url.slice(1);
  if (!isNaN(student_id)) {
    fs.access(full_path, fs.constants.R_OK, (err) => {
      if (err) {
        console.log(err);
        throw_error(res, `Ошибка чтения файла ${full_path}`);
      } else {
        let students = get_Students(full_path);
        let student = students.findIndex((stud) => stud.id === +student_id);
        if (student > -1) {
          students.splice(students.indexOf(student), 1);
          fs.writeFileSync(full_path, JSON.stringify(students));
          res.writeHead(200, { "Content-Type": "application/json" });
          socket.emit("changed");
          res.end(JSON.stringify(students));
        } else {
          throw_error(res, `Студент с id равным ${student_id} не найден`);
        }
      }
    });
  } else if (req.url.includes("backup")) {
    let backs = [];
    fs.readdir("./backup/", function (err, items) {
      for (let i = 0; i < items.length; i++) {
        backs.push({ i: items[i] });
      }
    });
    setTimeout(() => {
      let path = req.url.replace("/backup/", "");
      let year = path.slice(0, 4);
      let month = path.slice(4, 6);
      let day = path.slice(6, 8);
      let delete_backs = [];
      backs.forEach(function (item, i, arr) {
        let year_item = item.i.slice(0, 4);
        let month_item = item.i.slice(4, 6);
        let day_item = item.i.slice(6, 8);
        if (parseInt(year) > parseInt(year_item)) {
          delete_backs.push(item);
        } else {
          if (parseInt(year) === parseInt(year_item))
            if (parseInt(month) > parseInt(month_item)) {
              delete_backs.push(item);
            } else {
              if (
                parseInt(month) === parseInt(month_item) &&
                parseInt(day) > parseInt(day_item)
              ) {
                delete_backs.push(item);
              }
            }
        }
      });
      delete_backs.forEach(function (item, i, arr) {
        fs.unlinkSync("./backup/" + item.i);
      });
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(delete_backs));
    }, 100);
  }
};

let PUT_handler = (req, res) => {
  let full_path = "./static/students.json";
  switch (req.url) {
    case "/":
      let data_json = "";
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        fs.access(full_path, fs.constants.R_OK, (err) => {
          if (err) {
            throw_error(res);
          } else {
            let students = get_Students(full_path);
            let flag = false;
            students.forEach((stud) => {
              if (stud.id === +data_json.id) {
                flag = true;
                stud.name = data_json.name;
                stud.bday = data_json.bday;
                stud.speciality = data_json.speciality;
              }
            });
            if (flag) {
              fs.writeFileSync(full_path, JSON.stringify(students));
              res.writeHead(200, { "Content-Type": "application/json" });
              socket.emit("changed");
              res.end(JSON.stringify(data_json));
            } else {
              throw_error(res, `Ошибка нет студента с id ${data_json.id}`);
            }
          }
        });
      });
      break;
    default:
      throw_error(res, "Invalid method", 405);
  }
};

let POST_handler = (req, res) => {
  let full_path = "./static/students.json";
  switch (req.url) {
    case "/":
      let students = get_Students(full_path);
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        let student = JSON.parse(data);
        if (!students.find((stud) => stud.id === +student.id)) {
          students.push(student);
          fs.writeFileSync(full_path, JSON.stringify(students));
          res.writeHead(200, { "Content-Type": "application/json" });
          socket.emit("changed");
          res.end(JSON.stringify(student));
        } else {
          throw_error(res, `Студент с id ${student.id} уже существует`);
        }
      });
      break;
    case "/backup":
      setTimeout(() => {
        let cur = new Date();
        addZero = (n) => {
          return (n < 10 ? "0" : "") + n;
        };
        let backupPath =
          "./backup/" +
          addZero(cur.getFullYear()) +
          addZero(cur.getMonth() + 1) +
          addZero(cur.getDate()) +
          addZero(cur.getHours()) +
          addZero(cur.getMinutes()) +
          addZero(cur.getSeconds()) +
          "_student-list.json";
        fs.copyFile(full_path, backupPath, (err) => {
          if (err) {
            throw_error(res, err.message, 500);
          } else {
            res.end("Successfully copy");
          }
        });
      }, 2000);
      break;
    default:
      throw_error(res, "Invalid method", 405);
  }
};
let GET_handler = (req, res) => {
  let full_path = "./static/students.json";
  switch (req.url) {
    case "/":
      fs.access(full_path, fs.constants.R_OK, (err) => {
        if (err) {
          throw_error(res, `Ошибка чтения файла ${full_path}`);
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          fs.createReadStream(full_path).pipe(res);
        }
      });
      break;
    case "/backup":
      let backs = [];
      fs.readdir("./backup/", function (err, items) {
        console.log(items);
        for (let i = 0; i < items.length; i++) {
          let count = i.toString();
          backs.push([count, items[i]]);
        }
      });
      setTimeout(() => {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify(backs));
      }, 100);
      break;
    default:
      let student_id = req.url.slice(1);
      if (!isNaN(student_id)) {
        fs.access(full_path, fs.constants.R_OK, (err) => {
          if (err) {
            console.log(err);
            throw_error(res, `Ошибка чтения файла ${full_path}`);
          } else {
            let students = get_Students(full_path);
            let student = students.find((stud) => stud.id === +student_id);
            if (student) {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(student));
            } else {
              throw_error(res, `Студент с id равным ${student_id} не найден`);
            }
          }
        });
      }
  }
};

const requestHandler = (request, response) => {
  switch (request.method) {
    case "GET":
      GET_handler(request, response);
      break;
    case "POST":
      POST_handler(request, response);
      break;
    case "PUT":
      PUT_handler(request, response);
      break;
    case "DELETE":
      DELETE_handler(request, response);
      break;
    default:
      break;
  }
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
