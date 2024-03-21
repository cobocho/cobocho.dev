import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

/**
 * 모든 헤더 엘리먼트를 가져오는 함수
 */
export const getAllHeaderEls = () => {
  return Array.from(document.querySelectorAll('h1, h2, h3'));
};

/**
 * 현재 헤더 엘리먼트를 가져오는 함수
 */
export const checkCurrentHeader = (headers: Element[]) => {
  return (
    headers
      .filter((header) => {
        return header.getBoundingClientRect().top < 10;
      })
      .reverse()[0] || headers[0]
  );
};

/**
 * 중복된 이름의 헤더 엘리먼트에 구분자를 추가하는 함수
 */
export const addExistedHeaderCount = (headingElements: Element[]) => {
  const headers: { [key: string]: number } = {};

  headingElements.forEach((header) => {
    if (headers[header.id] >= 1) {
      headers[header.id]++;
      header.id = `${header.id}-${headers[header.id] - 1}`;
    } else {
      headers[header.id] = 1;
    }
  });
};

const useTOC = () => {
  const [currentHeader, setCurrentHeader] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  /**
   * 첫 진입시 헤더 엘리먼트를 설정하고 현재 스크롤의 헤더를 설정하는 로직
   */
  useEffect(() => {
    const headingElements = getAllHeaderEls();
    addExistedHeaderCount(headingElements);

    setHeadingEls(headingElements);

    const currentHeader = checkCurrentHeader(headingElements);
    if (currentHeader) {
      setCurrentHeader(currentHeader.id);
    }
  }, []);

  /**
   * 스크롤 변경에 따른 현재 헤더 변경 감지 이벤트를 설정하는 로직
   */
  useEffect(() => {
    const scrollHandler = debounce(() => {
      if (!headingEls.length) {
        return;
      }
      const currentHeader = checkCurrentHeader(headingEls);
      setCurrentHeader(currentHeader.id);
    }, 200);

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [headingEls]);

  return {
    currentHeader,
    headingEls,
  };
};

export default useTOC;
