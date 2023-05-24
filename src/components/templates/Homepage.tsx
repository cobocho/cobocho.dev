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
      <CategoriesWrapper categories={categories} category={category}/>
      {children}
    </>
  )
}

export default Homepage;