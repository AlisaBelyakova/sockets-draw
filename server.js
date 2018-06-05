var path = require('path');
var express = require('express');
var app = express();

var server = app.listen(1337, function () {
  console.log('The server is listening on port 1337!');
});

var socketio = require('socket.io');
var io = socketio(server);

io.on('connection', function (socket) {


  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  socket.on('disconnect', function () {
    console.log('socket id ' + socket.id + ' has disconnected. : (');
  })

  socket.on('imDrawing', function (start, end, color) {
    console.log('catching the draw event here')

    socket.broadcast.emit('otherDraw', start, end, color);
  });


})

/*
ROOMS: 
*/

// var drawHistory = {};

// io.on('connection', function (socket) {

//     // scope issues 
//     var room = null;

//     // listens to 37 emit 
//     socket.on('wantToJoinRoomPlox', function (roomName) {
//         room = roomName;
//         socket.join(roomName);


//         if (!drawHistory[roomName]) {
//             drawHistory[roomName] = [];
//         }

//         // console.log('drawhistory: ', drawHistory)
//         socket.emit('drawHistory', drawHistory[roomName]);
//     });

//     socket.on('newDraw', function (start, end, color) {
//         // data
//         console.log('new draw', start, end, color)
//         drawHistory[room].push({ start: start, end: end, color: color });
//         socket.broadcast.to(room).emit('someoneElseDrew', start, end, color);
//     });

// });

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



