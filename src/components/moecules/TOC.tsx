import { getIntersectionObserver } from '@/lib/getIntersectionObserver';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';

const TOCContainer = styled.div`
  .TOC {
    position: fixed;
    top: 200px;
    width: 250px;
    padding-left: 40px;
  }

  .TOC .headers {
    margin-bottom: 20px;
  }

  .TOC .headers li {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 400;
    list-style: none;
    opacity: 0.4;
    transition: all 0.2s;
  }

  .TOC .headers li.selected {
    opacity: 0.7;
    transform: scale(1.05);
  }

  .TOC .headers li.selected::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    display: block;
    width: 3px;
    height: 100%;
    background-color: ${props => props.theme.textColor};
    opacity: 0.5;
  }

  .TOC .headers li a {
    font-size: 15px;
    color: ${props => props.theme.textColor};
  }

  .TOC .headers li.H2-header {
    margin-left: 15px;
  }

  .TOC .headers li.H3-header {
    margin-left: 30px;
  }

  .toolbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    opacity: 0.8;
    background-color: ${props => props.theme.blockColor};
  }

  .toolbox li {
    list-style: none;
  }

  .toolbox button {
    padding: 8px 8px 4px 8px;
    border: none;
    background-color: transparent;
    opacity: 0.6;
    transform: scale(1.2);
  }

  .toolbox button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    opacity: 1;
    transition: all 0.4s;
  }

  .toolbox button span {
    color: ${props => props.theme.textColor};
  }

  .copy-complete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: ${props => props.theme.textColor};
    border-radius: 8px;
    background-color: ${props => props.theme.blockColor};
  }

  @media (max-width: 1420px) {
    display: none;
  }
`

const TOC = () => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  const [isCopyCompleteVisible, setIsCopyCompleteVisible] = useState<boolean>(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);
    headingElements.map((header) => {
      observer.observe(header);
    });
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopyCompleteVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isCopyCompleteVisible]);

  function copyUrlHandler() {
    navigator.clipboard.writeText(currentUrl.split('#')[0]);
    if (isCopyCompleteVisible) return;
    setIsCopyCompleteVisible(true);
  }

  function scroillUpHandler() {
    window.scrollTo({ top: 0  });
  }

  return (
    <TOCContainer>
      <motion.nav 
        className='TOC'
        variants={appearFromBottom}
        initial='hidden'
        animate='visible'
      >
        <ul className='headers'>
          {headingEls.map((head, i) => {
            const isCurrentHead = head.id === currentId;
            return (
              <li
                key={i}
                className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}
              >
                <a href={`#${head.id}`}>{head.textContent}</a>
              </li>
            )
          })}
        </ul>
        <ul className="toolbox">
          <li>
            <button type='button' onClick={copyUrlHandler}>
              <span className="material-symbols-outlined">
                link
              </span>
            </button>
          </li>
          <li>
            <a href='#giscuss'>
              <button type='button'>
                  <span className="material-symbols-outlined">
                    comment
                  </span>
              </button>
            </a>
          </li>
          <li>
            <button type='button' onClick={scroillUpHandler}>
              <span className="material-symbols-outlined">
                arrow_upward
              </span>
            </button>
          </li>
        </ul>
        <AnimatePresence>
          {
            isCopyCompleteVisible && 
            <motion.div 
              className='copy-complete'
              variants={appearFromBottom}
              initial='hidden'
              animate='visible'
              exit={{ 
                y: 30, 
                opacity: 0,
                transition: {
                  type: "spring",
                  stiffness: 100
                }
              }}
            >
              포스트 URL이 복사되었습니다!
            </motion.div>
          }
        </AnimatePresence>
      </motion.nav>
    </TOCContainer>
  );
};

export default TOC;