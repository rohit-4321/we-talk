import { atom } from 'recoil';

export type IChatMessage = {
  message: string,
  isSelf: boolean,
};
export type IRecipientData = {
  recipientName: string,
  isCaller: boolean,
};

export const AllMessageAtom = atom<IChatMessage[]>({
  key: 'chatMessage',
  default: [],
});

export const RecipientDataAtom = atom<IRecipientData | null>({
  key: 'recipientData',
  default: null,
});
