import { atom } from 'recoil';

export enum ThemeFlag {
  light,
  dark,
}

export const currentThemeState = atom({
  key: 'currentThemeState',
  default: ThemeFlag.light,
});
