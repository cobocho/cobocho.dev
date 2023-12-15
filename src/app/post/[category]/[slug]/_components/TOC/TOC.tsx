'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import TableList from './TableList';
import Toolbox from './Toolbox';

import useTOC from '@/hooks/useTOC';

const TOC = () => {
  const { currentHeader, headingEls } = useTOC();

  return (
    <Container>
      <nav className="TOC">
        <ul className="headers">
          {headingEls.length
            ? headingEls.map((head) => (
                <TableList head={head} isCurrentHead={head.id === currentHeader} key={head.id} />
              ))
            : null}
        </ul>
        <Toolbox />
      </nav>
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
