import {
  useCallback, useEffect, useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import SocketFactory from '../../service/socket';
import ChatBox from '../../components/chat/chatBox';
import { recipientUserNameAtom } from '../../global';
import LoadingScreen from '../../components/loading/loading';

const ChatScreen = () => {
  const socketRef = useRef(SocketFactory.getInstance());
  const location = useLocation();
  const { myName } = location.state;
  const [recipientName, setRecipientName] = useRecoilState(recipientUserNameAtom);

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

  return recipientName === null ? <LoadingScreen /> : <ChatBox />;
};

export default ChatScreen;
