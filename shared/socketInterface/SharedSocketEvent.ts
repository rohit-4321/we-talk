import { ChatData, RecipientConnectData, RecipientDisconnectData, UserDetailsData } from "./types";

export interface ServerToClientEvents {
  recipientConnect: ( data: RecipientConnectData) => void;
  privateMessage: (chatData : ChatData) => void;
  recipientDisconnected: (data: RecipientDisconnectData) => void;
  sdpOffer: (offer: RTCSessionDescription) => void;
  sdpAnswer: (ans: RTCSessionDescription) => void;
  iceCandidate: (cad: RTCIceCandidate) => void;

}

export interface ClientToServerEvents {
  userDetails: (userData: UserDetailsData) => void;
  privateMessage: (chatData : ChatData) => void;
  sdpOffer: (offer: RTCSessionDescription) => void;
  sdpAnswer: (ans: RTCSessionDescription) => void;
  iceCandidate: (cad: RTCIceCandidate) => void;
};

