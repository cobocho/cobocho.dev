import React, { PropsWithChildren } from 'react'

import { Title } from '@/components/ui/Title'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Title>Posts</Title>
      {children}
    </div>
  )
}

export default Layout
