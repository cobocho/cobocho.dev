// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    theme: string;
    middle: string;
    content: string;
    subContent: string;

    fontWeight: FontWeight;

    togglerColor: string;
    togglerButtonColor: string;
    togglerButtonShadow: string;
    togglerShadow: string;
  }
}
