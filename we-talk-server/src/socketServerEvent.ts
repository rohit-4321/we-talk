export interface ISocketData{
  userName: string,
  recipientId: string,
  recipientUserName: string
}


export interface InterServerEvents {
  ping: () => void;
}
