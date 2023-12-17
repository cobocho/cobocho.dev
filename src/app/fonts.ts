import { Bebas_Neue, Do_Hyeon } from 'next/font/google';
import localFont from 'next/font/local';

export const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

export const do_hyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
});

export const pretendard = localFont({
  src: '../../public/assets/font/Pretendard.woff2',
});
