import React, { PropsWithChildren } from 'react'

import { AppearBottom } from '@/components/motion/AppearBottom'

interface LayoutProps extends PropsWithChildren {
  params: {
    category: string
    page: string
  }
}

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <div>
      <AppearBottom>
        <h1 className="pt-20 text-5xl font-bold italic text-outline">
          {params.category}
        </h1>
      </AppearBottom>
      {children}
    </div>
  )
}

export default Layout
