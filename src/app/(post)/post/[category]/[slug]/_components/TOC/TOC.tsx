'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import TableList from './TableList';
import Toolbox from './Toolbox';

import useTOC from '@/hooks/useTOC';
import { appearFromBottom } from '@/styles/framer-motions';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

const TOC = () => {
  const { currentHeader, headingEls } = useTOC();

  return (
    <Container>
      <AppearBottom>
        <nav className="TOC">
          <ul className="headers">
            {headingEls.length ? (
              <>
                {headingEls.map((head) => (
                  <TableList head={head} isCurrentHead={head.id === currentHeader} key={head.id} />
                ))}
                <Toolbox />
              </>
            ) : null}
          </ul>
        </nav>
      </AppearBottom>
    </Container>
  );
};

const Container = styled.div`
  .TOC {
    .headers {
      padding-left: 20px;
      margin-bottom: 20px;

      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  @media (max-width: 1420px) {
    display: none;
  }
`;

export default TOC;
