import { atom } from 'recoil';

export enum ThemeFlag {
  light,
  dark,
}

export const themeState = atom({
  key: 'themeState',
  default: ThemeFlag.light, 
});