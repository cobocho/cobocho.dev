import { globalStyle, style } from '@vanilla-extract/css';
import { Theme } from './theme.css';

export const wrapper = style({
  backgroundColor: Theme.primary,
  fontWeight: Theme.fontWeight,
  color: Theme.content,

  transition: 'background-color 0.5s',
});

globalStyle('a', {
  color: Theme.content,
  textDecoration: 'none',
});

globalStyle('html', {
  scrollBehavior: 'smooth',
});

globalStyle('body', {
  overflowX: 'hidden',
});

globalStyle(
  'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video',
  {
    margin: '0',
    padding: '0',
    border: '0',
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    boxSizing: 'border-box',
  },
);
