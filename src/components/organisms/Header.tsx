import Link from "next/link"
import React from "react"
import styled from "styled-components"
import ThemeToggle from "../moecules/ThemeToggle"

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.813);
  z-index: 9999;
  box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.19);
  backdrop-filter: blur(10px);
  -webkit-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.4);
  font-weight: 300;
  color: #fff;

  svg:hover {
    cursor: pointer;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 900px;
    height: 100%;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .header-links a {
    font-size: 20px;
    color: #fff;
  }
  
  .main-link {
    margin-right: 30px;
    font-size: 32px;
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
        <div className="header-links">
          <Link href={"/"} className="main-link">cobocho.dev</Link>
          <Link href={"/about"} className="about">about</Link>
        </div>
        <ThemeToggle />
      </div>
    </HeaderBox>
  )
}

export default Header;