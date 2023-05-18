import { atom } from 'recoil';

export const userNameAtom = atom<string>({
  key: 'currentUserName',
  default: '',
});

export const recipientUserNameAtom = atom<string | null>({
  key: 'recipientUserName',
  default: null,
});
