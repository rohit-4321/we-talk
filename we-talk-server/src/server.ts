import { ClientToServerEvents, ServerToClientEvents } from '../../shared/socketInterface/SharedSocketEvent';
import express from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';
import { ISocketData, InterServerEvents } from './socketServerEvent';

const app = express();

const server = http.createServer(app);


const io = new Server<
ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
ISocketData>(server, {
    cors: {
      origin: "*",
    }
  });

const socketQueue: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, ISocketData>[] = [];

app.get('/', (req, res) => {
  res.send('Hello, world!....');
});

io.on('connection', (socket) => {
  console.log(`Socket connected with id ${socket.id}`);
  socket.on('userDetails', (userData) => {
    socket.data.userName = userData.userName;
    console.log(socketQueue.length);
    if(socketQueue.length !== 0) {
      if(socket.id !== socketQueue[0].id){
        const queueSocket = socketQueue.shift();
        queueSocket.data.recipientId = socket.id;
        queueSocket.data.recipientUserName = socket.data.userName;
        socket.data.recipientUserName = queueSocket.data.userName;
        socket.data.recipientId = queueSocket.id;
        socket.emit('recipientConnect', {
          recipientName: queueSocket.data.userName
        });
        queueSocket.emit('recipientConnect', {
          recipientName: socket.data.userName
        })
      }
    }else {
      socketQueue.push(socket);
    }
    console.log(userData);
  })

  socket.on('privateMessage', (chatData) => {
    if(socket.data.recipientId){
      socket.to(socket.data.recipientId).emit('privateMessage' , {
        message: chatData.message
      })
    }
    
  })

  socket.on('disconnect', () => {
    console.log(`Socket disconnected with id ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});