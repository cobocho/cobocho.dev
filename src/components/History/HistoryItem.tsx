import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  toggleMode?: boolean;
}

const HistoryItem = ({ title, children, className, toggleMode }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={className ? className : ''}>
      <Title
        variants={appearFromBottom}
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={toggleMode ? 'toggle-mode' : ''}
      >
        <p>{title}</p>
        {toggleMode && <ToggleButton toggle={toggle}>▴</ToggleButton>}
      </Title>
      {toggleMode ? toggle ? children : <></> : children}
    </div>
  );
};

const ToggleButton = styled.div<{ toggle: boolean }>`
  margin-left: 20px;

  font-size: 1.5rem;
  color: ${({ theme }) => theme.content};

  cursor: pointer;

  transform: rotateX(${({ toggle }) => (toggle ? 0 : 180)}deg);
  transition: transform 0.5s;
`;

const Title = styled(motion.h3)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;

  padding: 3px 3px 3px 3px;
  margin-bottom: 20px;

  border-bottom: 1px solid ${({ theme }) => theme.content};

  &.toggle-mode {
    cursor: pointer;
  }

  p {
    margin-right: 50px;

    font-size: 40px;
    font-weight: 700;
  }
`;

export default HistoryItem;
