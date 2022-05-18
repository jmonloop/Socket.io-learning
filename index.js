//Importo express
const express = require('express');
//Genero una nueva app con express
const app = express();
//Importo método http
const http = require('http');
//Con http, creo un nuevo servidor para la app creada con express
const server = http.createServer(app);

//Importo la clase Server de socket.io
const { Server } = require("socket.io");
//Instancio un nuevo Server de socket.io
const io = new Server(server);

//Envío el fichero index.html al client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Cuando se conecte un cliente, se ejecutará el método
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});

//Escucho el puerto 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});