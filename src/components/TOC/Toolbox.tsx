import React, { useEffect, useState } from 'react';
import TOCButton from './TOCButton';
import { motion, AnimatePresence } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';
import styled from 'styled-components';
import { CommentIcon, LinkIcon, TopArrowIcon } from '@/components/Icons';

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
    <Container>
      <ul className="toolbox">
        <li>
          <TOCButton onClick={copyUrlHandler}>
            <LinkIcon />
          </TOCButton>
        </li>
        <li>
          <a href="#giscus">
            <TOCButton>
              <CommentIcon />
            </TOCButton>
          </a>
        </li>
        <li>
          <TOCButton onClick={scrollUpHandler}>
            <TopArrowIcon />
          </TOCButton>
        </li>
      </ul>
      <AnimatePresence>
        {isCopyCompleteVisible && (
          <motion.div
            className="copy-complete"
            variants={appearFromBottom}
            initial="hidden"
            animate="visible"
            exit={{
              y: 30,
              opacity: 0,
              transition: {
                type: 'spring',
                stiffness: 100,
              },
            }}
          >
            포스트 URL이 복사되었습니다!
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  .toolbox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 9px 10px;
    margin-bottom: 10px;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.middle};

    li {
      list-style: none;
      svg {
        fill: ${({ theme }) => theme.content};
      }
    }
  }

  .copy-complete {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 30px;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.middle};

    color: ${({ theme }) => theme.content};
  }
`;

export default Toolbox;
