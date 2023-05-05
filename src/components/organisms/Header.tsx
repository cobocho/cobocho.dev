import Link from "next/link"
import React from "react"
import styled from "styled-components"

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.813);
  z-index: 9999;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.19);
  backdrop-filter: blur(10px);
  -webkit-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.4);
  font-weight: 300;
  color: #fff;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 0 auto;
  }

  .main-link, .about {
    font-size: 24px;
    color: #fff;
  }

  @media (max-width: 900px) {
    .header-wrapper {
      padding: 0 20px;
    }
  }
`

const Header = () => {
  return (
    <HeaderBox>
      <div className="header-wrapper">
        <Link href={"/"} className="main-link">cobocho.dev</Link>
        <Link href={"/about"} className="about">about</Link>
      </div>
    </HeaderBox>
  )
}

export default Header;