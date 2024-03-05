import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { CommentIcon, LinkIcon, TopArrowIcon } from '@/app/_components/Icons';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

import { copyComplete, toolbox, toolBoxButton } from './Toolbox.css';

const Toolbox = () => {
  const [isCopyCompleteVisible, setIsCopyCompleteVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopyCompleteVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isCopyCompleteVisible]);

  const copyUrlHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    if (isCopyCompleteVisible) return;
    setIsCopyCompleteVisible(true);
  };

  const scrollUpHandler = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <ul className={toolbox}>
        <li>
          <button className={toolBoxButton} onClick={copyUrlHandler}>
            <LinkIcon />
          </button>
        </li>
        <li>
          <a href="#giscus">
            <button className={toolBoxButton}>
              <CommentIcon />
            </button>
          </a>
        </li>
        <li>
          <button className={toolBoxButton} onClick={scrollUpHandler}>
            <TopArrowIcon />
          </button>
        </li>
      </ul>
      <AnimatePresence>
        {isCopyCompleteVisible && (
          <AppearBottom>
            <div className={copyComplete}>포스트 URL이 복사되었습니다!</div>
          </AppearBottom>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toolbox;
