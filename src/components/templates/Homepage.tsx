import React from "react"
import styled from "styled-components"
import PostCard from "../moecules/PostCard"
import Post from "@/types/post"
import Layout from "../Layout"

type Props = {
	children: JSX.Element,
}

const Homepage = ({ children } : Props) => {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default Homepage;