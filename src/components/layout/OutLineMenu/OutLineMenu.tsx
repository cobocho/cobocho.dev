import { PropsWithChildren } from 'react'
import Link from 'next/link'

import { AppearLeft } from '@/components/motion/AppearLeft'

import { GlobalMenu } from '../GlobalMenu'

interface OutLineMenuProps extends PropsWithChildren {}

export const OutLineMenu = ({ children }: OutLineMenuProps) => {
  return (
    <div className="relative h-dvh w-dvw bg-outline">
      <div className="absolute left-6 top-6 z-10 rounded-br-3xl bg-outline mobile:left-4 mobile:top-4 mobile:rounded-br-xl">
        <div className="absolute -right-6 h-6 w-6 bg-outline mobile:-right-3 mobile:h-3 mobile:w-3">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white" />
        </div>
        <div className="mobile-3 absolute top-full h-6 w-6 bg-outline mobile:h-3">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white" />
        </div>
        <div className="flex">
          <Link href="/">
            <AppearLeft className="flex select-none items-end gap-1 p-2 pb-4 pr-4 text-5xl font-[800] italic text-white mobile:p-1 mobile:pb-2 mobile:pr-2 mobile:pt-0 mobile:text-xl">
              untitled<p className="text-lg font-light not-italic">.dev</p>
            </AppearLeft>
          </Link>
          <div className="absolute left-full ml-10 flex h-full items-center justify-center mobile:ml-2">
            <GlobalMenu />
          </div>
        </div>
      </div>
      <div className="absolute h-full w-full overflow-hidden p-6 mobile:p-4">
        <div className="mobile:rounded-x3 h-full w-full overflow-hidden rounded-3xl bg-white pr-2">
          <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
