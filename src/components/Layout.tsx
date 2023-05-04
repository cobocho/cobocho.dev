import React from "react"
import styled from "styled-components"
import PostCard from "./moecules/PostCard"
import Post from "@/types/post"

type Props = {
	children: JSX.Element,
}

const LayoutBox = styled.main`
  width: 1180px;
  height: 100vh;
  margin: 0 auto;
`

const Layout = ({ children } : Props) => {
  return (
    <LayoutBox>
      {children}
    </LayoutBox>
  )
}

export default Layout;