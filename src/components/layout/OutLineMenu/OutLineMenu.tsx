import { PropsWithChildren } from 'react'
import Link from 'next/link'

import { AppearLeft } from '@/components/motion/AppearLeft'

interface OutLineMenuProps extends PropsWithChildren {}

export const OutLineMenu = ({ children }: OutLineMenuProps) => {
  return (
    <div className="relative h-dvh w-dvw bg-outline">
      <div className="mobile:left-4 mobile:top-4 mobile:rounded-br-xl absolute left-6 top-6 z-10 rounded-br-3xl bg-outline">
        <div className="mobile:h-3 mobile:w-3 mobile:-right-3 absolute -right-6 h-6 w-6 bg-outline">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white" />
        </div>
        <div className="mobile:h-3 mobile-3 absolute top-full h-6 w-6 bg-outline">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white" />
        </div>
        <Link href="/">
          <AppearLeft className="mobile:text-xl mobile:pb-2 mobile:p-1 mobile:pr-2 flex items-end gap-1 p-2 pb-4 pr-4 text-5xl font-[800] italic text-white">
            untitled<p className="text-lg font-thin not-italic">.dev</p>
          </AppearLeft>
        </Link>
      </div>
      <div className="mobile:p-4 absolute h-full w-full overflow-hidden p-6">
        <div className="mobile:rounded-xl h-full w-full overflow-hidden rounded-3xl bg-white p-2">
          <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
