import { AppearLeft } from '@/components/motion/AppearLeft'
import { PropsWithChildren } from 'react'

interface OutLineMenuProps extends PropsWithChildren {}

export const OutLineMenu = ({ children }: OutLineMenuProps) => {
  return (
    <div className="bg-outline relative h-dvh w-dvw">
      <div className="bg-outline absolute left-6 top-6 z-10 rounded-br-3xl">
        <div className="bg-outline absolute -right-6 h-6 w-6">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white"></div>
        </div>
        <div className="bg-outline absolute top-full h-6 w-6">
          <div className="absolute left-0 top-0 h-[200%] w-[200%] rounded-full bg-white"></div>
        </div>
        <AppearLeft className="flex items-end gap-1 p-2 pb-4 pr-4 text-5xl font-[800] italic text-white">
          untitled<p className="text-lg font-thin not-italic">.dev</p>
        </AppearLeft>
      </div>
      <div className="absolute h-full w-full overflow-hidden p-6">
        <div className="h-full w-full overflow-hidden rounded-3xl bg-white p-2">
          <div className="h-full w-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
