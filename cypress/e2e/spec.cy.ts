const SELECTOR = Object.freeze({
	POST_CARD: '.post-card',

	NEXT_BTN: '#next-btn',
	PREV_BTN: '#prev-btn',
});

describe('template spec', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('한 페이지에 포스트는 10개가 존재한다.', () => {
		cy.get(SELECTOR.POST_CARD).should('have.length', 10);
	});

	it('다음 페이지를 누르면 2페이지로 이동한다.', () => {
		cy.get(SELECTOR.NEXT_BTN).click();
	});
});
