const http = require("http");
const url = require("url");
let dboperations = require("./dboperations");

function getAllByName(res, name) {
  try {
    dboperations.getAllByName(name).then((result) => {
      console.log(result);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.end(JSON.stringify(result));
    });
  } catch (err) {
    console.log(err);
    write_error(res, err, 500);
  }
}

let GET_handler = (req, res) => {
  console.log(req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(require("fs").readFileSync("./14-01.html"));
      break;
    case "/api/faculties":
      getAllByName(res, "faculty");
      break;
    case "/api/pulpits":
      getAllByName(res, "pulpit");
      break;
    case "/api/subjects":
      getAllByName(res, "subject");
      break;
    case "/api/auditoriumstypes":
      getAllByName(res, "auditorium_type");
      break;
    case "/api/auditoriums":
      getAllByName(res, "auditorium");
      break;
    default:
      write_error(res, "Not found", 404);
      break;
  }
};
let POST_handler = (req, res) => {
  let data_json = "";
  console.log(req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(require("fs").readFileSync("./14-01.html"));
      break;
    case "/api/faculties":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .post_Faculties(data_json.FACULTY, data_json.FACULTY_NAME)
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/pulpits":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .post_Pulpits(
            data_json.PULPIT,
            data_json.PULPIT_NAME,
            data_json.FACULTY
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/subjects":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .post_Subjects(
            data_json.SUBJECT,
            data_json.SUBJECT_NAME,
            data_json.PULPIT
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/auditoriumstypes":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .post_Auditoriums_Types(
            data_json.AUDITORIUM_TYPE,
            data_json.AUDITORIUM_TYPENAME
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/auditoriums":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .post_Auditoriums(
            data_json.AUDITORIUM,
            data_json.AUDITORIUM_NAME,
            data_json.AUDITORIUM_CAPACITY,
            data_json.AUDITORIUM_TYPE
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    default:
      write_error(res, "Not found", 404);
      break;
  }
};

let PUT_handler = (req, res) => {
  let data_json = "";
  console.log(req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(require("fs").readFileSync("./14-01.html"));
      break;
    case "/api/faculties":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .put_Faculties(data_json.FACULTY, data_json.FACULTY_NAME)
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/pulpits":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .put_Pulpits(
            data_json.PULPIT,
            data_json.PULPIT_NAME,
            data_json.FACULTY
          )
          .then((records) => {
            if (records.rowsAffected[0] > 0) {
              res.end(JSON.stringify(data_json));
            } else {
              write_error(res, "0 row affected", 500);
            }
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/subjects":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .put_Subjects(
            data_json.SUBJECT,
            data_json.SUBJECT_NAME,
            data_json.PULPIT
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/auditoriumstypes":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .put_Auditoriums_Types(
            data_json.AUDITORIUM_TYPE,
            data_json.AUDITORIUM_TYPENAME
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    case "/api/auditoriums":
      req.on("data", (chunk) => {
        data_json += chunk;
      });
      req.on("end", () => {
        data_json = JSON.parse(data_json);
        res.writeHead(200, { "Content-Type": "application/json" });
        dboperations
          .put_Auditoriums(
            data_json.AUDITORIUM,
            data_json.AUDITORIUM_NAME,
            data_json.AUDITORIUM_CAPACITY,
            data_json.AUDITORIUM_TYPE
          )
          .then((records) => {
            res.end(JSON.stringify(data_json));
          })
          .catch((error) => {
            write_error(res, error, 500);
          });
      });
      break;
    default:
      write_error(res, "Not found", 404);
      break;
  }
};

let DELETE_handler = (req, res) => {
  let path = url.parse(req.url).pathname;
  let path_mas = path.split("/");
  switch ("/api/" + path_mas[2]) {
    case "/api/faculties":
      res.writeHead(200, { "Content-Type": "text/plain" });
      dboperations
        .delete_Faculties(path_mas[3])
        .then((records) => {
          res.end("deleted");
        })
        .catch((error) => {
          write_error(res, error, 500);
        });
      break;
    case "/api/pulpits":
      res.writeHead(200, { "Content-Type": "text/plain" });
      dboperations
        .delete_Pulpits(path_mas[3])
        .then((records) => {
          res.end("deleted");
        })
        .catch((error) => {
          write_error(res, error, 500);
        });
      break;
    case "/api/subjects":
      res.writeHead(200, { "Content-Type": "text/plain" });
      dboperations
        .delete_Subjects(path_mas[3])
        .then((records) => {
          res.end("deleted");
        })
        .catch((error) => {
          write_error(res, error, 500);
        });
      break;
    case "/api/auditoriumstypes":
      res.writeHead(200, { "Content-Type": "text/plain" });
      dboperations
        .delete_Auditoriums_Types(path_mas[3])
        .then((records) => {
          res.end("deleted");
        })
        .catch((error) => {
          write_error(res, error, 500);
        });
      break;
    case "/api/auditoriums":
      res.writeHead(200, { "Content-Type": "text/plain" });
      dboperations
        .delete_Auditoriums(path_mas[3])
        .then((records) => {
          res.end("deleted");
        })
        .catch((error) => {
          write_error(res, error, 500);
        });
      break;
    default:
      write_error(res, "Not found", 404);
      break;
  }
};

let http_handle = (req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      GET_handler(req, res);
      break;
    case "POST":
      POST_handler(req, res);
      break;
    case "PUT":
      PUT_handler(req, res);
      break;
    case "DELETE":
      DELETE_handler(req, res);
      break;
    default:
      write_error(res, "Invalid method", 400);
  }
};

function write_error(res, error, code) {
  res.statusCode = code;
  res.statusMessage = error;
  res.end(JSON.stringify({ error: String(error) }));
}
let server = http.createServer();
server
  .listen(3000, () => console.log("Running on 3000 port"))
  .on("request", http_handle);
