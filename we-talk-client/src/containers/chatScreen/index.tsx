import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketFactory from '../../service/socket';
import ChatBox from './chatBox';
import LoadingScreen from '../../components/loading/loading';

const ChatScreen = () => {
  const socketRef = useRef(SocketFactory.getInstance());
  const location = useLocation();
  const navigate = useNavigate();
  const { myName } = location.state;
  const [recipientName, setRecipientName] = useState<string | null>(null);

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
  ), [setRecipientName]);

  const onRecipientDisconnect = useCallback(() => (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socketRef.current.addRecipientDisconnectedEvent((_) => {
      navigate('/');
    })
  ), [navigate]);

  useEffect(() => {
    const socket = socketRef.current;
    const onConnectCleanUp = onConnect();
    const onRecipientFoundCleanUp = onRecipientFound();
    const onRecipientDisconnectCleanUp = onRecipientDisconnect();
    socket.connectSocket();
    return () => {
      onConnectCleanUp();
      onRecipientFoundCleanUp();
      socket.disConnectSocket();
      onRecipientDisconnectCleanUp();
      setRecipientName(null);
    };
  }, [onConnect, onRecipientFound, onRecipientDisconnect]);

  return recipientName === null ? <LoadingScreen /> : <ChatBox />;
};

export default ChatScreen;
