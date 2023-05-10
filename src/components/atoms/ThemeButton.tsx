import React from "react";
import styled from "styled-components";
import { ThemeFlag } from "@/stores/theme";

type Props = {
  currentTheme: ThemeFlag;
}

const ThemeButtonSwitch = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.togglerButtonColor};;
  box-shadow: ${(props) => props.theme.togglerButtonShadow};
  
  transform: ${(props) => props.theme === ThemeFlag.dark ? 'translateX(30px)' : 'translateX(0)'};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }
`

const ThemeButton = ({currentTheme} : Props) => {
  return (
    <ThemeButtonSwitch theme = {currentTheme}>
    </ThemeButtonSwitch>
  )
}

export default ThemeButton;