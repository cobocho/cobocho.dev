import React from "react"

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