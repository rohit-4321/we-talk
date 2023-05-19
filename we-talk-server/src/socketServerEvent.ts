export interface ISocketData{
  userName: string,
  recipientId: string,
  recipientUserName: string,
  isRecipientOnline: boolean,
}


export interface InterServerEvents {
  ping: () => void;
}
