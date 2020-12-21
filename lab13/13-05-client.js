const buffer = require("buffer");
const udp = require("dgram");
const client = udp.createSocket(`udp4`);
const PORT = 30000;

client.on("message", (msg, info) => {
  console.log("Client: от сервера получено" + msg.toString());
  console.log(
    `Client: получено ${msg.length} байтов от ${info.address}:${info.port}\n`
  );
});

let data = Buffer.from("Client: сообщение 01");
client.send(data, PORT, "localhost", (err) => {
  if (err) {
    client.close();
  } else {
    console.log("Client: данные отправлены серверу");
  }
});

let data1 = Buffer.from("Привет ");
let data2 = Buffer.from("Мир");

client.send([data1, data2], PORT, "localhost", (err) => {
  if (err) {
    client.close();
  } else {
    console.log("Client: данные отправлены серверу");
  }
});
