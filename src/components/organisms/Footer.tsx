import React from "react"
import styled from "styled-components"

const FooterBox = styled.footer`
  width: 100vw;
  height: 80px;
  position : relative;
  text-align: center;
  color: #cfcfcf;
  background-color: ${(props) => props.theme.bgColor};
  
  transition: all 0.5s;

`

const Footer = () => {
  return (
    <FooterBox>
      © 2023. Kim Min-gyu all rights reserved.
    </FooterBox>
  )
}

export default Footer;