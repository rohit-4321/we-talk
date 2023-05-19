import { Socket, io } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../../shared/socketInterface/SharedSocketEvent';
import {
  UserDetailsData,
  RecipientConnectData,
  ChatData,
  RecipientDisconnectData,
} from '../../../shared/socketInterface/types';

import { SERVER_URL } from '../constants';

class SocketFactory {
  private static instance: SocketFactory;

  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  private constructor() {
    this.socket = io(SERVER_URL, { autoConnect: false });
  }

  static getInstance(): SocketFactory {
    if (!SocketFactory.instance) {
      SocketFactory.instance = new SocketFactory();
    }
    return SocketFactory.instance;
  }

  public getSocket() {
    return this.socket;
  }

  public connectSocket(): void {
    this.socket.connect();
  }

  public disConnectSocket(): void {
    this.socket.disconnect();
  }

  // Events..
  public addConnectEvent(callback: () => void): () => void {
    this.socket.on('connect', callback);
    return () => {
      this.socket.off('connect', callback);
    };
  }

  public addrecipientConnectEvent(callback: (data: RecipientConnectData) => void): () => void {
    this.socket.on('recipientConnect', callback);
    return () => {
      this.socket.off('recipientConnect', callback);
    };
  }

  public addprivateMessageEvent(callback: (chatData: ChatData) => void): () => void {
    this.socket.on('privateMessage', callback);
    return () => {
      this.socket.off('privateMessage', callback);
    };
  }

  public addRecipientDisconnectedEvent(
    callback: (data: RecipientDisconnectData) => void,
  ): () => void {
    this.socket.on('recipientDisconnected', callback);
    return () => {
      this.socket.off('recipientDisconnected', callback);
    };
  }

  // Emitter...
  public emitUserDetails(data: UserDetailsData): void {
    this.socket.emit('userDetails', data);
  }

  public emitPrivateMessage(msgData: ChatData): void {
    this.socket.emit('privateMessage', msgData);
  }
}

export default SocketFactory;
