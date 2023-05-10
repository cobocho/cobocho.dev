import React from "react";
import styled from "styled-components";
import { ThemeFlag } from "@/stores/theme";

type Props = {
  currentTheme: ThemeFlag;
}

const ThemeIcon = styled.button`
  height: 30px;
  aspect-ratio: 1 / 1;
  position: absolute;
  border: none;
  border-radius: 50%;
  background-color: #565656;
  box-shadow: inset 6px 6px 5px #4b4b4b,
            inset -6px -6px 5px #616161;
  
  transform: ${(props) => {
    return props.theme === ThemeFlag.dark ? 'translateX(30px)' : 'translateX(0)' 
  }};
  transition: transform 0.3s;
`

const ThemeButton = ({currentTheme} : Props) => {
  return (
    <ThemeIcon theme = {currentTheme}>
    </ThemeIcon>
  )
}

export default ThemeButton;