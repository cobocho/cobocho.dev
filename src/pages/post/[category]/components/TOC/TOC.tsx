import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';
import TableList from './TableList';
import Toolbox from './Toolbox';

const checkCurrentHeader = (headers: Element[]) => {
  return headers
    .filter((header) => {
      return header.getBoundingClientRect().top < 10;
    })
    .reverse()[0];
};

const TOC = () => {
  const router = useRouter();

  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  const [isCopyCompleteVisible, setIsCopyCompleteVisible] = useState<boolean>(false);
  const [showMobile, setShowMobile] = useState<boolean>(false);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);

    const currentHeader = checkCurrentHeader(headingElements);
    if (currentHeader) setCurrentId(currentHeader.id || headingElements[0].id);
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopyCompleteVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isCopyCompleteVisible]);

  function copyUrlHandler() {
    navigator.clipboard.writeText(window.location.href);
    if (isCopyCompleteVisible) return;
    setIsCopyCompleteVisible(true);
  }

  function scrollUpHandler() {
    window.scrollTo({ top: 0 });
  }

  const scrollHandler = () => {
    if (!headingEls || headingEls.length === 0) return;

    const currentHeader = checkCurrentHeader(headingEls);

    if (!currentHeader) {
      setCurrentId(headingEls[0].id);
      return;
    }

    if (currentHeader.id !== currentId) {
      setCurrentId(currentHeader.id);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, [headingEls]);

  return (
    <Container showMobile={showMobile}>
      <div
        className="mobile-toc"
        onClick={() => setShowMobile(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </svg>
      </div>
      <motion.nav
        className={`TOC ${showMobile ? 'show' : ''}`}
        variants={appearFromBottom}
        initial="hidden"
        animate="visible"
      >
        <div
          className="close-button"
          onClick={() => setShowMobile(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
          </svg>
        </div>
        <ul className="headers">
          {headingEls.map((head, i) => {
            const isCurrentHead = head.id === currentId;
            return (
              <TableList
                head={head}
                isCurrentHead={isCurrentHead}
                key={head.id}
              />
            );
          })}
        </ul>
        <Toolbox
          copyUrlHandler={copyUrlHandler}
          scrollUpHandler={scrollUpHandler}
          isCopyCompleteVisible={isCopyCompleteVisible}
        />
      </motion.nav>
    </Container>
  );
};

const Container = styled.div<{ showMobile: boolean }>`
  padding-top: 50px;
  z-index: 200;

  .mobile-toc {
    display: none;
  }

  .close-button {
    display: none;
  }

  .TOC {
    position: fixed;
    top: 114px;
    width: 300px;
    padding-left: 40px;
  }

  .TOC .headers {
    padding-left: 20px;
    overflow-y: scroll;
    margin-bottom: 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
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
      background-color: ${(props) => props.theme.blockColor};
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
      fill: ${(props) => props.theme.textColor};
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
      background-color: ${(props) => props.theme.blockColor};
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
      z-index: 999;
      transition: bottom 1s ease-in-out;
    }

    .TOC.show {
      bottom: 0;
    }

    .TOC .headers {
      max-height: 60vh;
      padding: 0 40px;
      overflow-y: scroll;
    }

    .TOC .headers li {
      width: fit-content;
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
`;

export default TOC;
