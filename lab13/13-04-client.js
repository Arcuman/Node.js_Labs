const net = require("net");

let HOST = "127.0.0.1";
let PORT = process.argv[2] ? process.argv[2] : 40004;
let k = process.argv[3] ? process.argv[3] : 1;

let client = new net.Socket();
let timerId = null;
client.connect(PORT, HOST, () => {
  console.log(
    "Client CONNECTED: ",
    client.remoteAddress + " " + client.remotePort
  );
  timerId = setInterval(() => {
    client.write(`client: ${k}`);
  }, 1000);
  setTimeout(() => {
    clearInterval(timerId);
    client.end();
  }, 20000);
});

client.on("data", (data) => {
  console.log("FROM SERVER DATA: " + data);
});
client.on("close", () => {
  console.log("CLIENT close: ");
});
client.on("error", (error) => {
  console.log("CLIENT ERROR: ", error);
});
