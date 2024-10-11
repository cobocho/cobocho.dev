import React, { PropsWithChildren } from 'react'

import { AppearBottom } from '@/components/motion/AppearBottom'

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <AppearBottom className="flex h-fit w-full items-center justify-between pb-10 pt-20">
      <h1 className="text-5xl font-bold italic text-outline">{children}</h1>
    </AppearBottom>
  )
}
