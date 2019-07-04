let express = require("express");  // We create an instance of express and store it into app variable.
let app = express();

let http = require("http"); // create server with http module.
let server = http.Server(app); // pass express to http.Server() method.  Express will serve as the handler for requests to our server.
// In return we get the instance of server which we store in server variable.

let soketIO = require("socket.io"); // bind the socket.IO with our http server
let io = soketIO(server);

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("new-message", (message) => {
        console.log(message);
        io.emit("new-message", message); // it sends an event to everyone connected to the server.
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
})
