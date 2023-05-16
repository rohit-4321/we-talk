import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import SocketFactory from '../../service/socket';
import ChatBox from '../../components/chat/chatBox';

const ChatScreen = () => {
  const socketRef = useRef(SocketFactory.getInstance());
  const location = useLocation();
  const { myName } = location.state;
  const [recipientName, setRecipientName] = useState<string>('');

  const onConnect = useCallback(() => (
    socketRef.current.addConnectEvent(() => {
      socketRef.current.emitUserDetails({
        userName: myName,
      });
    })
  ), [myName]);

  const onRecipientFound = useCallback(() => (
    socketRef.current.addrecipientConnectEvent((data) => {
      // Connected with the recipient
      setRecipientName(data.recipientName);
    })
  ), []);

  useEffect(() => {
    const socket = socketRef.current;
    const onConnectCleanUp = onConnect();
    const onRecipientFoundCleanUp = onRecipientFound();
    socket.connectSocket();
    return () => {
      onConnectCleanUp();
      onRecipientFoundCleanUp();
      socket.disConnectSocket();
    };
  }, [onConnect, onRecipientFound]);

  return recipientName === '' ? <h1>Loading...</h1> : <ChatBox />;
};

export default ChatScreen;
