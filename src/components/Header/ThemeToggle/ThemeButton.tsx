import { ThemeFlag } from '@/hooks/useThemeToggle';
import React from 'react';
import styled from 'styled-components';

type Props = {
  currentTheme: ThemeFlag;
};

type ThemeButtonProps = {
  currentTheme: number;
};

const ThemeButtonSwitch = styled.button<ThemeButtonProps>`
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
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

const ThemeButton = ({ currentTheme }: Props) => {
  return (
    <ThemeButtonSwitch currentTheme={currentTheme}>
      <span>다크 모드 버튼</span>
    </ThemeButtonSwitch>
  );
};

export default ThemeButton;
