'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

export const calculatePages = (postQuantity: number) => {
  const pages = Array.from(
    { length: Math.ceil(postQuantity / 10) },
    (_, i) => i + 1,
  )
  return pages
}

export const usePagination = (postQuantity: number) => {
  const router = useRouter()
  const pathname = usePathname()
  const { page } = useParams()

  const pages = calculatePages(postQuantity)
  const isFirstPage = page === '1' || !page
  const isLastPage = page ? Number(page) === pages.length : pages.length === 1

  const currentPage = Number(page) || 1

  const isCurrentPage = (currentPage: number) =>
    page === String(currentPage) || (!page && currentPage === 1)

  const increasePage = () => {
    if (!page) {
      router.push('/2')
      return
    }

    if (isLastPage) {
      return
    }

    const url = pathname.split('/')
    const nextPage = Number(page) + 1
    url[url.length - 1] = String(nextPage)
    router.push(url.join('/'))
  }

  const decreasePage = () => {
    if (!page) {
      router.push(`/${pages.length - 1}`)
      return
    }

    if (isFirstPage) {
      return
    }

    const url = pathname.split('/')
    const prevPage = Number(page) - 1
    url[url.length - 1] = String(prevPage)
    router.push(url.join('/'))
  }

  return {
    url: pathname,
    page,
    pages,
    isFirstPage,
    isLastPage,
    currentPage,
    increasePage,
    decreasePage,
    isCurrentPage,
  }
}
