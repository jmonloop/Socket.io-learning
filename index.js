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


const generateUserName = () => {
    return `User${Math.floor(Math.random() * 10000)}`;
}

//Cuando se conecte un cliente, se ejecutará el método
io.on('connection', (socket) => {

    //Guardo el socket.id
    const myId = socket.id;

    //Genero un nuevo username
    let user = generateUserName();
    socket.emit('myself', user);

    //Emito el username de quien se conectó hacia el resto de usuarios
    socket.broadcast.emit('user', user);

    //Emito el username y el mensaje de chat hacia el resto de usuarios
    socket.on('chat message', (msg) => {
        socket.broadcast.emit(
            'chat message',
            user,
            msg
        );
    });


});

//Escucho el puerto 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});