/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const userNameAtom = atom<string>({
  key: 'currentUserName',
  default: '',
});
