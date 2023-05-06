import Head from "next/head";
import React from "react"
import CategoriesWrapper from "../organisms/CategoriesWrapper";
import Layout from "../Layout";

type Props = {
	children: JSX.Element,
  categories: string[],
  category?: string,
}

const Homepage = ({ children, categories, category } : Props) => {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default Homepage;