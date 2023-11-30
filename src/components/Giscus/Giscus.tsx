import { useEffect, useRef } from 'react';
import { ThemeFlag, currentThemeState } from '@/stores/theme';
import { useRecoilState } from 'recoil';

const Giscus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentTheme] = useRecoilState(currentThemeState);
  const commentTheme = currentTheme === ThemeFlag.light ? 'light' : 'dark';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    let localTheme;

    if (localStorage.getItem('dark_mode') !== undefined) {
      localTheme = Number(localStorage.getItem('dark_mode')) === ThemeFlag.light ? 'light' : 'dark';
    }

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'cobocho/cobocho.dev.comments');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOJhwQXw');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOJhwQX84CWani');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', localTheme || commentTheme);
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.setAttribute('crossorigin', 'anonymous');

    ref.current.appendChild(scriptElem);
  }, [commentTheme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: commentTheme } } }, 'https://giscus.app');
  }, [commentTheme]);

  return <section className="giscus" id="giscus" ref={ref}></section>;
};

export default Giscus;
