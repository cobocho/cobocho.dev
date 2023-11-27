import { useEffect, useState } from 'react';

/**
 * 모든 헤더 엘리먼트를 가져오는 함수
 */
const getAllHeaderEls = () => {
	return Array.from(document.querySelectorAll('h1, h2, h3'));
};

/**
 * 현재 헤더 엘리먼트를 가져오는 함수
 */
const checkCurrentHeader = (headers: Element[]) => {
	return (
		headers
			.filter((header) => {
				return header.getBoundingClientRect().top < 10;
			})
			.reverse()[0] || headers[0]
	);
};

const useTOC = () => {
	const [currentHeader, setCurrentHeader] = useState<string>('');
	const [headingEls, setHeadingEls] = useState<Element[]>([]);

	/**
	 * 첫 진입시 헤더 엘리먼트를 설정하고 현재 스크롤의 헤더를 설정하는 로직
	 */
	useEffect(() => {
		const headingElements = getAllHeaderEls();

		setHeadingEls(headingElements);

		const currentHeader = checkCurrentHeader(headingElements);
		if (currentHeader) {
			setCurrentHeader(currentHeader.id || headingElements[0].id);
		}
	}, []);

	/**
	 * 스크롤 변경에 따른 현재 헤더 변경 감지 이벤트를 설정하는 로직
	 */
	useEffect(() => {
		const scrollHandler = () => {
			if (!headingEls.length) return;
			const currentHeader = checkCurrentHeader(headingEls);
			setCurrentHeader(currentHeader.id);
		};

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
