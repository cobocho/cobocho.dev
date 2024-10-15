import React, { PropsWithChildren } from 'react'

import { Title } from '@/components/ui/Title'

interface LayoutProps extends PropsWithChildren {
  params: {
    category: string
    page: string
  }
}

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <div>
      <Title>{decodeURIComponent(params.category)}</Title>
      {children}
    </div>
  )
}

export default Layout
