import React from "react"

type Props = {
	children: JSX.Element,
}

const Homepage = ({ children } : Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default Homepage;