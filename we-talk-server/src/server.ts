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

const tryConnect = () => {
  if (socketQueue.length >= 2) {
    const sk1 = socketQueue.shift();
    const sk2 = socketQueue.shift();

    sk1.data.recipientId = sk2.id;
    sk1.data.recipientUserName = sk2.data.userName;

    sk2.data.recipientUserName = sk1.data.userName;
    sk2.data.recipientId = sk1.id;

    sk2.emit('recipientConnect', {
      recipientName: sk1.data.userName,
      isCaller: true
    });
    sk1.emit('recipientConnect', {
      recipientName: sk2.data.userName,
      isCaller: false,
    })
  }
};
io.on('connection', (socket) => {
  console.log(`Socket connected with id ${socket.id}`);

  socket.on('userDetails', (userData) => {
    socket.data.userName = userData.userName;
    socketQueue.push(socket);
    tryConnect();
  })

  socket.on('privateMessage', (chatData) => {
    console.log(`First id ${socket.data.recipientId}`);
    console.log(`Second id ${io.sockets.sockets.get(socket.data.recipientId).id}`);
    if(socket.data.recipientId){
      socket.to(socket.data.recipientId).emit('privateMessage' , {
        message: chatData.message
      })
    }
  })

  socket.on('sdpOffer', (offer) => {
    if(socket.data.recipientId){
      socket.to(socket.data.recipientId).emit('sdpOffer', offer);
    }
  })

  socket.on('sdpAnswer', (ans) => {
    if(socket.data.recipientId){
      socket.to(socket.data.recipientId).emit('sdpAnswer', ans);
    }
  })

  socket.on('iceCandidate', (cad) => {
    if(socket.data.recipientId){
      socket.to(socket.data.recipientId).emit('iceCandidate', cad);
    }
  })

  socket.on('disconnect', () => {
    if(socket.data.recipientId) {
      const recipientSocket = io.sockets.sockets.get(socket.data.recipientId);
      socket.to(socket.data.recipientId).emit('recipientDisconnected', {
        userName: socket.data.userName
      })
      socket.data.recipientId='';
      socket.data.recipientUserName='';
      recipientSocket.data.recipientId='';
      recipientSocket.data.recipientUserName='';
    }
    const indexInQueue = socketQueue.indexOf(socket);
    if (indexInQueue !== -1){
      socketQueue.splice(indexInQueue, 1);
    }
    console.log(`Socket disconnected with id ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});