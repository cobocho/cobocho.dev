'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/utils/cn'

interface GlobalMenuItemProps extends PropsWithChildren {
  href: string
}

const GlobalMenuItem = ({ children, href }: GlobalMenuItemProps) => {
  const pathname = usePathname()
  const isActive = '/' + pathname.split('/')[1] === href

  return (
    <div className="relative px-6 py-1">
      {isActive && (
        <motion.div
          layoutId="active-menu"
          className="absolute left-0 top-0 h-full w-full rounded-full bg-outline"
        />
      )}
      <Link
        href={href}
        className={cn(
          'group relative w-full text-center font-light transition-all delay-[50]',
          isActive && 'text-background font-bold italic',
        )}
      >
        {children}
        <div
          className={cn(
            'h-[1px] w-full scale-x-0 bg-outline transition-transform group-hover:scale-x-150',
          )}
        />
      </Link>
    </div>
  )
}

export const GlobalMenu = () => {
  return (
    <nav className="bg-background flex gap-10 rounded-full border-[1px] border-[#dfdfdf] p-1">
      <GlobalMenuItem href="/">Home</GlobalMenuItem>
      <GlobalMenuItem href="/tech">Tech</GlobalMenuItem>
      <GlobalMenuItem href="/log">Log</GlobalMenuItem>
      <GlobalMenuItem href="/life">Life</GlobalMenuItem>
      <GlobalMenuItem href="/profile">Profile</GlobalMenuItem>
    </nav>
  )
}
