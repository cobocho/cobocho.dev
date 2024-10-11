'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { useAutoScrollUp } from '@/utils/useAutoScrollUp'

export const AutoScroll = () => {
  const pathname = usePathname()

  const { handleScrollUp } = useAutoScrollUp()

  useEffect(() => {
    handleScrollUp()
  }, [handleScrollUp, pathname])

  return null
}
