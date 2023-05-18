import { ChatData, RecipientConnectData, UserDetailsData } from "./types";

export interface ServerToClientEvents {
  recipientConnect: ( data: RecipientConnectData) => void
  privateMessage: (chatData : ChatData) => void;
}

export interface ClientToServerEvents {
  userDetails: (userData: UserDetailsData) => void;
  privateMessage: (chatData : ChatData) => void;
};

