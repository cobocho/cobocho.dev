import React, { PropsWithChildren } from 'react'

import { AppearBottom } from '@/components/motion/AppearBottom'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AppearBottom>
        <h1 className="pt-20 text-5xl font-bold italic text-outline">Posts</h1>
      </AppearBottom>
      {children}
    </div>
  )
}

export default Layout
