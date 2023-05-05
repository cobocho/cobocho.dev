import React from "react"
import styled from "styled-components"
import PostCard from "./moecules/PostCard"
import Post from "@/types/post"

type Props = {
	children: JSX.Element,
}

const LayoutBox = styled.main`
  width: 900px;
  padding-top: 50px;
  padding-bottom: 100px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);

  @media (max-width: 900px) {
    width: 90vw;
  padding-top: 30px;
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