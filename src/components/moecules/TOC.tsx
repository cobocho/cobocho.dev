import { getIntersectionObserver } from '@/lib/getIntersectionObserver';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';
import TOCButton from '../atoms/TOCButton';

const TOCContainer = styled.div<{showMobile:boolean}>`
  padding-top: 100px;
  
  .mobile-toc {
    display: none;
  }

  .close-button {
    display: none;
  }

  .TOC {
    position: fixed;
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
    .mobile-toc {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: fixed;
      bottom: 40px;
      right: 20px;
      opacity: 0.6;
      background-color: ${props => props.theme.blockColor};
      z-index: 999;
    }

    .mobile-toc:hover {
      cursor: pointer;
    }

    .close-button {
      display: block;
      position: absolute;
      top: 20px;
      right: 20px;
      width: fit-content;
      height: fit-content;
      fill: ${props => props.theme.textColor};
      opacity: 0.6;
    }

    .close-button:hover {
      cursor: pointer;
    }

    .TOC {
      display: 'block';
      position: fixed;
      width: 95vw;
      height: fit-content;
      left: 2.5vw;
      bottom: -100%;
      padding: 40px 0 30px 0;
      background-color: ${props => props.theme.blockColor};
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
      z-index: 999;
      transition: bottom 1s ease-in-out;
    }

    .TOC.show {
      bottom: 0;
    }

    .TOC .headers {
      max-height: 70vh;
      padding: 0 40px;
      overflow-y: scroll;
    }

    .TOC .headers li {
      width: fit-content;
    }

    .TOC .headers li a {
      font-size: 18px;
    }

    .copy-complete {
      position: absolute;
      bottom: 10px;
      left: 0;
      font-size: 20px;
    }

    @keyframes appear {
      0% {
        bottom: -100%;
      }
      100% {
        bottom: 0;
      }
    }
  }

  @keyframes unmount {
    0% {
      bottom: 0;
    }
    100% {
      bottom: -100%;
    }
  }
`

const TOC = () => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  const [isCopyCompleteVisible, setIsCopyCompleteVisible] = useState<boolean>(false);
  const [showMobile, setShowMobile] = useState<boolean>(false);

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

  function scrollUpHandler() {
    window.scrollTo({ top: 0  });
  }

  return (
    <TOCContainer showMobile={showMobile}>
      <div className="mobile-toc" onClick={() => setShowMobile(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
        </svg>
      </div>
      <motion.nav 
        className={`TOC ${showMobile ? 'show' : ''}`}
        variants={appearFromBottom}
        initial='hidden'
        animate='visible'
      >
        <div className="close-button" onClick={() => setShowMobile(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/>
          </svg>
        </div>
        <ul className='headers'>
          {headingEls.map((head, i) => {
            const isCurrentHead = head.id === currentId;
            return (
              <li
                key={i}
                className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}
              >
                <a href={`#${head.id}`} onClick={() => {
                  setTimeout(() => {
                    setCurrentId(head.id);
                  }, 50)
                }}>
                  {head.textContent}
                </a>
              </li>
            )
          })}
        </ul>
        <ul className="toolbox">
          <li>
            <TOCButton onClick={copyUrlHandler}>
              link
            </TOCButton>
          </li>
          <li>
            <a href='#giscuss'>
              <TOCButton>
                comment
              </TOCButton>
            </a>
          </li>
          <li>
            <TOCButton onClick={scrollUpHandler}>
            arrow_upward
            </TOCButton>
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