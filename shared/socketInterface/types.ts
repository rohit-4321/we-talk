export interface ChatData {
  message: string,
}
// When connection Establised with another user...
export interface RecipientConnectData {
  recipientName: string,
  isCaller: boolean,
}
export interface UserDetailsData {
  userName: string 
} 
export interface RecipientDisconnectData {
  userName: string
}