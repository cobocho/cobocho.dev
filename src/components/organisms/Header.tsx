import React from "react"
import styled from "styled-components"

const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 80px;
  background-color: #000;
  z-index: 9999;
`

const Header = () => {
  return (
    <HeaderBox>
    </HeaderBox>
  )
}

export default Header;