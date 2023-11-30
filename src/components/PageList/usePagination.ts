import { useRouter } from 'next/router';

const usePagination = (postQuantity: number) => {
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const pages = Array.from({ length: Math.ceil(postQuantity / 10) }, (v, i) => i + 1);

  const isFirstPage = page === '1' || !page;
  const isLastPage = page ? +page === pages.length : pages.length === 1;
  const isCurrentPage = (currentPage: number) => page === String(currentPage) || (!page && currentPage === 1);

  const increasePage = () => {
    if (!query.page) {
      router.push('/2');
      return;
    }
    const url = router.asPath.split('/');
    const nextPage = +query.page + 1;
    url[url.length - 1] = String(nextPage);
    router.push(url.join('/'));
  };

  const decreasePage = () => {
    if (!query.page) {
      router.push(`/${pages.length - 1}`);
      return;
    }
    const url = router.asPath.split('/');
    const prevPage = +query.page - 1;
    url[url.length - 1] = String(prevPage);
    router.push(url.join('/'));
  };

  return {
    url: router.asPath,
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
