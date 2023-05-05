const observerOption = {
  threshold: 1,
  rootMargin: '0px 0px 0px 0px',
};


export const getIntersectionObserver = (callback : void) => {
  let direction = '';
  let prevYposition = 0;

  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = 'down';
    else direction = 'up';

    prevYposition = window.scrollY;
  };

  const observer = new IntersectionObserver(
    (entries) => { 
      entries.forEach((entry) => {
        checkScrollDirection(prevYposition);
        if (
          (direction === 'down' && !entry.isIntersecting) ||
          (direction === 'up' && entry.isIntersecting)
        ) {
          callback(entry.target.textContent);
        }
      });
    }, observerOption);
  return observer;
};