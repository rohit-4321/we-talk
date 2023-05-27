import React, {
  FC, useRef, useEffect, useCallback,
} from 'react';
import { useRecoilValue } from 'recoil';
import VideoLayoutWrapper from '../../components/layout/videoLayoutWrapper';
import SocketFactory from '../../service/socket';
import { RecipientDataAtom } from '../../global/chat';
import { RTC_SERVERS } from '../../constants';

interface IVideoPaneProps {
  socketRef: React.MutableRefObject<SocketFactory>
}
const VideoPane: FC<IVideoPaneProps> = ({
  socketRef,
}) => {
  const myStream = useRef<HTMLVideoElement | null>(null);
  const recipientStream = useRef<HTMLVideoElement | null>(null);
  const recipientData = useRecoilValue(RecipientDataAtom);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const offerSend = useRef(false);

  const handleNegotiationNeededEvent = useCallback(() => {
    if (peerConnection.current && !offerSend.current) {
      peerConnection.current
        .createOffer()
        .then((offer) => {
          if (peerConnection.current) {
            peerConnection.current.setLocalDescription(offer)
              .then(() => {
                socketRef.current.emitSdpOffer(
                  peerConnection.current?.localDescription as RTCSessionDescription,
                );
                offerSend.current = true;
              })
              .catch((err) => {
                console.log('Error in Negotiation Needed', err);
              });
          }
        });
    }
  }, [socketRef]);
  const handleIceCandidateEvent = useCallback((ev: RTCPeerConnectionIceEvent) => {
    if (ev.candidate) {
      socketRef.current.emitIceCandidate(ev.candidate);
    }
  }, [socketRef]);

  const handleTrackEvent = useCallback((ev: RTCTrackEvent) => {
    if (recipientStream.current) {
      // eslint-disable-next-line prefer-destructuring
      recipientStream.current.srcObject = ev.streams[0];
    }
  }, []);

  const createPeer = useCallback(() => {
    peerConnection.current = new RTCPeerConnection(RTC_SERVERS);
    peerConnection.current.onnegotiationneeded = handleNegotiationNeededEvent;
    peerConnection.current.onicecandidate = handleIceCandidateEvent;
    peerConnection.current.ontrack = handleTrackEvent;
  }, [handleIceCandidateEvent, handleNegotiationNeededEvent, handleTrackEvent]);

  useEffect(() => {
    if (recipientData?.isCaller) {
      createPeer();
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
        .then((localStream) => {
          if (myStream.current) {
            myStream.current.srcObject = localStream;
          }
          localStream.getTracks().forEach(
            (track) => { peerConnection.current?.addTrack(track, localStream); },
          );
        })
        .catch((err) => {
          console.log('Cannot open the camera', err);
        });
    }
    return () => {
      if (peerConnection.current) {
        peerConnection.current.onnegotiationneeded = null;
        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.close();
      }
    };
  }, [createPeer,
    handleIceCandidateEvent,
    handleNegotiationNeededEvent,
    handleTrackEvent,
    recipientData]);

  useEffect(() => {
    const addOnSdpOfferEventCleanUp = socketRef.current.addOnSdpOfferEvent((incomingOffer) => {
      createPeer();
      const desc = new RTCSessionDescription(incomingOffer);
      peerConnection.current?.setRemoteDescription(desc)
        .then(() => navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        }))
        .then((localStream) => {
          if (myStream.current) {
            myStream.current.srcObject = localStream;
          }
          localStream.getTracks().forEach(
            (track) => { peerConnection.current?.addTrack(track, localStream); },
          );
        })
        .then(() => peerConnection.current?.createAnswer())
        .then((ans) => peerConnection.current?.setLocalDescription(ans))
        .then(() => {
          socketRef.current.emitSdpAnswer(
            peerConnection.current?.localDescription as RTCSessionDescription,
          );
        })
        .catch((err) => {
          console.log('Error in handling incoming Offer', err);
        });
    });

    const addOnSdpAnswerCleanUp = socketRef.current.addOnSdpAnswer((incomingAns) => {
      const desc = new RTCSessionDescription(incomingAns);
      peerConnection.current?.setRemoteDescription(desc)
        .catch((err) => {
          console.log('Error In Setting the answer', err);
        });
    });

    const addOnIceCandidateEventCleanUp = socketRef.current.addOnIceCandidateEvent((cad) => {
      const candidate = new RTCIceCandidate(cad);
      peerConnection.current?.addIceCandidate(candidate);
    });
    return () => {
      addOnIceCandidateEventCleanUp();
      addOnSdpAnswerCleanUp();
      addOnSdpOfferEventCleanUp();
      if (peerConnection.current) {
        peerConnection.current?.removeEventListener('negotiationneeded', handleNegotiationNeededEvent);
        peerConnection.current?.removeEventListener('icecandidate', handleIceCandidateEvent);
        peerConnection.current?.removeEventListener('track', handleTrackEvent);
        peerConnection.current?.close();
      }
    };
  }, [createPeer, socketRef, handleIceCandidateEvent,
    handleNegotiationNeededEvent,
    handleTrackEvent]);

  return (
    <VideoLayoutWrapper>
      <video
        style={{
          width: '400px',
          height: '400px',
        }}
        ref={myStream}
        muted
        autoPlay
      />
      <video
        style={{
          width: '400px',
          height: '400px',
        }}
        ref={recipientStream}
        muted
        autoPlay
      />
    </VideoLayoutWrapper>
  );
};
export default React.memo(VideoPane);
