import React from "react"
import styled from "styled-components"
import PostCard from "./moecules/PostCard"
import Post from "@/types/post"

type Props = {
	children: JSX.Element,
}

const LayoutBox = styled.main`
  width: 900px;
  height: 100vh;
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 100vw;
  }
`

const Layout = ({ children } : Props) => {
  return (
    <LayoutBox>
      {children}
    </LayoutBox>
  )
}

export default Layout;