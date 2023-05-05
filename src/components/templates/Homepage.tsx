import Head from "next/head";
import React from "react"

type Props = {
	children: JSX.Element,
}

const Homepage = ({ children } : Props) => {
  return (
    <>
      <Head>
        <title>김민규의 기술블로그</title>
      </Head>
      {children}
    </>
  )
}

export default Homepage;