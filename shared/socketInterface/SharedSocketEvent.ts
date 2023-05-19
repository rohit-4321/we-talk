import { ChatData, RecipientConnectData, RecipientDisconnectData, UserDetailsData } from "./types";

export interface ServerToClientEvents {
  recipientConnect: ( data: RecipientConnectData) => void;
  privateMessage: (chatData : ChatData) => void;
  recipientDisconnected: (data: RecipientDisconnectData) => void;
}

export interface ClientToServerEvents {
  userDetails: (userData: UserDetailsData) => void;
  privateMessage: (chatData : ChatData) => void;
};

