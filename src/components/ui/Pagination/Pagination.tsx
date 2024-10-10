'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/utils/cn'

import { Icon } from '../Icon'

import { usePagination } from './usePagination'

interface PaginationProps {
  postQuantity: number
}

const getComputedUrl = (url: string, pageNumber: number, page?: string) => {
  const result = url.split('/')
  if (page) {
    result[result.length - 1] = String(pageNumber)
  }
  return page ? result.join('/') : `/${pageNumber}`
}

export const Pagination = ({ postQuantity }: PaginationProps) => {
  const {
    pages,
    currentPage,
    url,
    increasePage,
    decreasePage,
    isLastPage,
    isFirstPage,
  } = usePagination(postQuantity)

  return (
    <div className="flex gap-4">
      <button
        className={cn(
          'h-8 w-8 disabled:cursor-default disabled:opacity-20',
          !isFirstPage &&
            'transition-transform duration-300 hover:-translate-x-2',
        )}
        onClick={decreasePage}
        disabled={isFirstPage}
      >
        <Icon name="arrowLeft" />
      </button>
      <div className="flex">
        {pages.map((page) => (
          <Link
            href={getComputedUrl(url, page, String(currentPage))}
            key={page}
            className={cn(
              'mx-1 flex h-8 w-8 items-center justify-center rounded-xl font-semibold',
              Number(currentPage) === page
                ? 'bg-outline text-white hover:cursor-pointer'
                : 'transition-all duration-300 hover:cursor-pointer hover:bg-outline/10',
            )}
          >
            {page}
          </Link>
        ))}
      </div>
      <button
        className={cn(
          'h-8 w-8 disabled:cursor-default disabled:opacity-20',
          !isLastPage &&
            'transition-transform duration-300 hover:translate-x-2',
        )}
        onClick={increasePage}
        disabled={isLastPage}
      >
        <Icon name="arrowRight" />
      </button>
    </div>
  )
}
