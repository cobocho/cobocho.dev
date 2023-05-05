import Link from "next/link"
import React from "react"
import styled from "styled-components"

const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 80px;
  background-color: #000;
  z-index: 9999;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.19);
  -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.19);
  -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.19);

  .header-wrapper {
    width: 900px;
    margin: 0 auto;
  }

  .main-link {
    font-size: 40px;
    font-weight: 800;
    color: #fff;
  }
`

const Header = () => {
  return (
    <HeaderBox>
      <div className="header-wrapper">
        <Link href={"/"} className="main-link">cobocho.dev</Link>
      </div>
    </HeaderBox>
  )
}

export default Header;