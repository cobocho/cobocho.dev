import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import TableList from './TableList';
import Toolbox from './Toolbox';

import { appearFromBottom } from '@/styles/framer-motions';

const checkCurrentHeader = (headers: Element[]) => {
  return (
    headers
      .filter((header) => {
        return header.getBoundingClientRect().top < 10;
      })
      .reverse()[0] || headers[0]
  );
};

const TOC = () => {
  const router = useRouter();

  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  const scrollHandler = useCallback(() => {
    if (!headingEls || headingEls.length === 0) return;
    const currentHeader = checkCurrentHeader(headingEls);
    setCurrentId(currentHeader.id);
  }, [headingEls]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);

    const currentHeader = checkCurrentHeader(headingElements);
    if (currentHeader) setCurrentId(currentHeader.id || headingElements[0].id);
  }, [router]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, [headingEls, scrollHandler]);

  return (
    <Container>
      <motion.nav
        className="TOC"
        variants={appearFromBottom}
        initial="hidden"
        animate="visible"
      >
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
        <Toolbox />
      </motion.nav>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 50px;
  z-index: 200;

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
    display: none;
  }

  @keyframes appear {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 0;
    }
  }
`;

export default TOC;
