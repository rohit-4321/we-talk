import { atom } from 'recoil';

export type IChatMessage = {
  message: string,
  isSelf: boolean,
};

export const AllMessageAtom = atom<IChatMessage[]>({
  key: 'chatMessage',
  default: [{
    message: 'Hello boys',
    isSelf: true,
  },
  {
    message: 'Hello boys',
    isSelf: false,
  },
  ],
});
