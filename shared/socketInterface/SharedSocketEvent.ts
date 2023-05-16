
// When connection Establised with another user...
export interface RecipientConnectData {
  recipientName: string,
}
export interface ServerToClientEvents {
  recipientConnect: ( data: RecipientConnectData) => void
}

// when connection will establise with server we will have to send some data to server..
export interface UserDetailsData {
  userName: string 
} 
export interface ClientToServerEvents {
  userDetails: (userData: UserDetailsData) => void;
}
