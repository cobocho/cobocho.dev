import { useParams, usePathname, useRouter } from 'next/navigation';

import { calculatePages } from '@/lib/utils';

const usePagination = (postQuantity: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page } = useParams();

  const pages = calculatePages(postQuantity);

  const isFirstPage = page === '1' || !page;

  const isLastPage = page ? +page === pages.length : pages.length === 1;

  const isCurrentPage = (currentPage: number) =>
    page === String(currentPage) || (!page && currentPage === 1);

  const increasePage = () => {
    if (!page) {
      router.push('/2');
      return;
    }

    const url = pathname!.split('/');
    const nextPage = Number(page) + 1;
    url[url.length - 1] = String(nextPage);
    router.push(url.join('/'));
  };

  const decreasePage = () => {
    if (!page) {
      router.push(`/${pages.length - 1}`);
      return;
    }
    const url = pathname!.split('/');
    const prevPage = Number(page) - 1;
    url[url.length - 1] = String(prevPage);
    router.push(url.join('/'));
  };

  return {
    url: pathname,
    page,
    pages,
    isFirstPage,
    isLastPage,
    increasePage,
    decreasePage,
    isCurrentPage,
  };
};

export default usePagination;
