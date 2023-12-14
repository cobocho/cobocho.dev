import { ThemeFlag } from '@/hooks/useThemeToggle';
import React from 'react';
import styled from 'styled-components';

interface Props {
  currentTheme: ThemeFlag;
}

const ThemeButton = ({ currentTheme }: Props) => {
  return (
    <Container currentTheme={currentTheme}>
      <span>다크 모드 버튼</span>
    </Container>
  );
};

const Container = styled.button<Props>`
  width: 30px;
  height: 30px;
  position: absolute;

  border: none;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.togglerButtonColor};

  box-shadow: ${({ theme }) => theme.togglerButtonShadow};

  transform: ${(props) => (props.currentTheme === ThemeFlag.dark ? 'translateX(30px)' : 'translateX(0)')};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }

  span {
    position: absolute;

    width: 1px;
    height: 1px;

    margin: -1px;
    padding: 0;

    border: 0;

    clip: rect(0 0 0 0);

    overflow: hidden;
    white-space: nowrap;
  }
`;

export default ThemeButton;
