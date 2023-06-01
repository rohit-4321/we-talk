import {
  useCallback, useEffect, useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SocketFactory from '../../service/socket';
import ChatBox from './chatBox';
import LoadingScreen from '../../components/loading/loading';
import { RecipientDataAtom } from '../../global/chat';
import PanelWrapper from '../../components/layout/PanelWrapper';
import VideoPane from './VideoPane';
import RTCPeer from '../../service/RTCPeer';
import { askMedia } from '../../utils/navigator';

const ChatScreen = () => {
  const rtcPeer = useRef<RTCPeer | null>(null);
  const recipientStream = useRef<HTMLVideoElement | null>(null);
  const myStream = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef(SocketFactory.getInstance());
  const location = useLocation();
  const navigate = useNavigate();
  const { myName } = location.state;
  const [recipientData, setRecipientData] = useRecoilState(RecipientDataAtom);
  const clearNavigatorMedia = useRef<() => void>();
  const rtcHandlerCleanUp = useRef<() => void>();

  const createPeer = useCallback(() => {
    rtcPeer.current = RTCPeer.getInstance();
    const addOnNegotiationNeededEventCleanUp = rtcPeer.current
      .addOnNegotiationNeededEvent((offer) => {
        socketRef.current.emitSdpOffer(offer);
      });
    const addOnIceCandidateCleanUp = rtcPeer.current.addOnIceCandidate((cad) => {
      socketRef.current.emitIceCandidate(cad);
    });

    const addOnTrackEventCleanUp = rtcPeer.current.addOnTrackEvent((ev) => {
      if (recipientStream.current) {
        // eslint-disable-next-line prefer-destructuring
        recipientStream.current.srcObject = ev.streams[0];
      }
    });
    return () => {
      addOnNegotiationNeededEventCleanUp();
      addOnIceCandidateCleanUp();
      addOnTrackEventCleanUp();
    };
  }, []);
  const onConnect = useCallback(() => (
    socketRef.current.addConnectEvent(() => {
      socketRef.current.emitUserDetails({
        userName: myName,
      });
    })
  ), [myName]);

  const onRecipientFound = useCallback(() => {
    const onRecipientFoundCleanUp = socketRef.current.addrecipientConnectEvent((data) => {
      setRecipientData(data);
      if (data.isCaller) {
        rtcHandlerCleanUp.current = createPeer();
        askMedia()
          .then(({ stream, clearMedia }) => {
            if (myStream.current) {
              myStream.current.srcObject = stream;
            }
            rtcPeer.current?.addTracks(stream);
            clearNavigatorMedia.current = clearMedia;
          });
      }
    });
    return () => {
      onRecipientFoundCleanUp();
    };
  }, [createPeer, setRecipientData]);

  const onRecipientDisconnect = useCallback(() => (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socketRef.current.addRecipientDisconnectedEvent((_) => {
      if (clearNavigatorMedia.current) {
        clearNavigatorMedia.current();
      }
      navigate('/');
    })
  ), [navigate]);

  useEffect(() => {
    const socket = socketRef.current;
    const onConnectCleanUp = onConnect();
    const onRecipientFoundCleanUp = onRecipientFound();
    const onRecipientDisconnectCleanUp = onRecipientDisconnect();
    const addOnSdpOfferEventCleanUp = socketRef.current.addOnSdpOfferEvent((incomingOffer) => {
      rtcHandlerCleanUp.current = createPeer();
      rtcPeer.current?.setRemoteOffer(incomingOffer)
        .then(() => askMedia())
        .then(({ stream, clearMedia }) => {
          if (myStream.current) {
            myStream.current.srcObject = stream;
          }
          rtcPeer.current?.addTracks(stream);
          clearNavigatorMedia.current = clearMedia;
        })
        .then(() => rtcPeer.current?.getPeer().createAnswer())
        .then((ans) => rtcPeer.current?.getPeer().setLocalDescription(ans))
        .then(() => {
          socketRef.current.emitSdpAnswer(
            rtcPeer.current?.getLocalDescription() as RTCSessionDescription,
          );
        })
        .catch((err) => {
          console.log('Error in handling incoming Offer', err);
        });
    });
    const addOnSdpAnswerCleanUp = socketRef.current.addOnSdpAnswer((incomingAns) => {
      rtcPeer.current?.setRemoteOffer(incomingAns)
        .catch((err) => {
          console.log('Error In Setting the answer', err);
        });
    });

    const addOnIceCandidateEventCleanUp = socketRef.current.addOnIceCandidateEvent((cad) => {
      rtcPeer.current?.addIceCandidate(cad);
    });
    socket.connectSocket();
    return () => {
      onConnectCleanUp();
      onRecipientFoundCleanUp();
      socket.disConnectSocket();
      onRecipientDisconnectCleanUp();

      addOnSdpOfferEventCleanUp();
      addOnSdpAnswerCleanUp();
      addOnIceCandidateEventCleanUp();
      setRecipientData(null);
      if (clearNavigatorMedia.current) {
        clearNavigatorMedia.current();
      }

      if (rtcHandlerCleanUp.current) {
        rtcHandlerCleanUp.current();
      }
    };
  }, [onConnect,
    onRecipientFound,
    onRecipientDisconnect,
    setRecipientData,
    createPeer]);

  return recipientData === null ? <LoadingScreen /> : (
    <PanelWrapper>
      <VideoPane recipientStream={recipientStream} myStream={myStream} />
      <ChatBox />
    </PanelWrapper>
  );
};

export default ChatScreen;
