import Head from "next/head";
import React from "react"
import CategoriesWrapper from "../organisms/CategoriesWrapper";

type Category = {
  categoryName: string;
  quantity: number;
}

type Props = {
	children: JSX.Element,
  categories: Category[],
  category?: string;
}

const Homepage = ({ children, categories, category } : Props) => {
  return (
    <>
      <Head>
        <title>김민규의 기술블로그</title>
      </Head>
      <CategoriesWrapper categories={categories} category={category}/>
      {children}
    </>
  )
}

export default Homepage;