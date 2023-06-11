import { atom } from 'recoil';
import { PostConnectinfo } from '../../../shared/socketInterface/types';

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

export const PostConnectInfoAtom = atom<PostConnectinfo | null>({
  key: 'postConnectInfo',
  default: null,
});
