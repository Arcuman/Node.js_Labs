const net = require("net");

let HOST = "127.0.0.1";
let PORT = 40002;

let client = new net.Socket();
let buf = Buffer.alloc(4);
let timerId = null;
let x = Number(process.argv[2]);

client.connect(PORT, HOST, async () => {
  console.log(
    "Client CONNECTED",
    client.remoteAddress + " " + client.remotePort
  );
  timerId = setInterval(() => {
    client.write((buf.writeInt32LE(x, 0), buf));
  }, 1000);
  setTimeout(() => {
    clearInterval(timerId);
    client.end();
  }, 20000);
});

client.on("data", (data) => {
  console.log("CLIENT DATA: " + data.readInt32LE(0));
});

client.on("close", () => {
  console.log("Client close");
});
