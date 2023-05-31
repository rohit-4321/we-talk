import {
  useCallback, useEffect, useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SocketFactory from '../../service/socket';
import ChatBox from './chatBox';
import LoadingScreen from '../../components/loading/loading';
import { RecipientDataAtom } from '../../global/chat';

const ChatScreen = () => {
  const socketRef = useRef(SocketFactory.getInstance());
  const location = useLocation();
  const navigate = useNavigate();
  const { myName } = location.state;
  const [recipientData, setRecipientData] = useRecoilState(RecipientDataAtom);

  const onConnect = useCallback(() => (
    socketRef.current.addConnectEvent(() => {
      socketRef.current.emitUserDetails({
        userName: myName,
      });
    })
  ), [myName]);

  const onRecipientFound = useCallback(() => (
    socketRef.current.addrecipientConnectEvent((data) => {
      setRecipientData(data);
    })
  ), [setRecipientData]);

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
      setRecipientData(null);
    };
  }, [onConnect, onRecipientFound, onRecipientDisconnect, setRecipientData]);

  return recipientData === null ? <LoadingScreen /> : <ChatBox />;
};

export default ChatScreen;
