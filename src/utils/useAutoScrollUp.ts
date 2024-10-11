export const useAutoScrollUp = () => {
  const handleScrollUp = () => {
    document.querySelector('#top-fix')!.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return {
    handleScrollUp,
  }
}
