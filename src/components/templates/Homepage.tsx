import React from "react"
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