import React, { PropsWithChildren } from 'react'

import { CategoryList } from '@/components/post/CategoryList'
import { Title } from '@/components/ui/Title'
import { getCategories } from '@/apis/category'

interface LayoutProps extends PropsWithChildren {
  params: {
    category: string
    page: string
  }
}

const Layout = ({ children, params }: LayoutProps) => {
  const categories = getCategories()

  return (
    <div>
      <Title>{params.category}</Title>
      <CategoryList categories={categories} currentCategory={params.category} />
      {children}
    </div>
  )
}

export default Layout
