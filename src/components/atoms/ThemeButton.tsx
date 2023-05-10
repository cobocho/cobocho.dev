import React from "react";
import styled from "styled-components";
import { ThemeFlag } from "@/stores/theme";

type Props = {
  theme: ThemeFlag;
}

const ThemeIcon = styled.button`
  width: 25px;
  aspect-ratio: 1 / 1;
  opacity: 0.8;
  border: none;
  border-radius: 50%;
  background-color: #000;
  transform: ${(props) => {
    return props.theme === ThemeFlag.dark ? 'translateX(30px)' : 'translateX(0)' 
  }};
  transition: transform 0.5s;
`

const ThemeButton = ({theme}: Props) => {
  return (
    <ThemeIcon theme={theme}>
    </ThemeIcon>
  )
}

export default ThemeButton;