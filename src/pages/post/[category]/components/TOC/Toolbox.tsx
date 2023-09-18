import React from 'react';
import TOCButton from './TOCButton';
import { motion, AnimatePresence } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';
import styled from 'styled-components';

interface Props {
  copyUrlHandler: () => void;
  scrollUpHandler: () => void;
  isCopyCompleteVisible: boolean;
}

const Toolbox = ({ copyUrlHandler, isCopyCompleteVisible, scrollUpHandler }: Props) => {
  return (
    <Container>
      <ul className="toolbox">
        <li>
          <TOCButton onClick={copyUrlHandler}>link</TOCButton>
        </li>
        <li>
          <a href="#giscus">
            <TOCButton>comment</TOCButton>
          </a>
        </li>
        <li>
          <TOCButton onClick={scrollUpHandler}>arrow_upward</TOCButton>
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
    opacity: 0.8;
    background-color: ${(props) => props.theme.blockColor};
  }

  .toolbox li {
    list-style: none;
  }

  .copy-complete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    border-radius: 8px;
    background-color: ${(props) => props.theme.blockColor};
  }
`;

export default Toolbox;
