export interface CompanyProps {
	name: string;
	engName: string;
	position: string;
	engPosition: string;
	employmentPeriod: string;
	work: string;
	engWork: string;
}

const NON_DEV_COMPANIES: CompanyProps[] = [
	{
		name: '한국지역난방공사',
		engName: 'Korea District Heating Corporation',
		position: '주임',
		engPosition: 'Assistant Manager',
		employmentPeriod: '2019/07/29 - 2023/08/25',
		work: `DCS(Distributed Control System)를 사용한 지역난방 열교환기 조작 및 지역 간 열공급 연계 오퍼레이터 업무 담당.
지사 내 건축물 유지보수, 하자처리 관련 관리 감독.
`,
		engWork: `Responsible for the operation of district heating heat exchangers using the Distributed Control System (DCS) and the supply and demand of heat supply linkage between regions.
Supervision of building maintenance and defect handling in branch offices.
`,
	},
	{
		name: '대한민국 육군',
		engName: 'Republic of Korea Army',
		position: '병장',
		engPosition: 'Sergeant',
		employmentPeriod: '2021/01/25 - 2022/07/24',
		work: `UH-60 Blackhawk 중형기동헬기 운용 승무원. 파일럿 비행 보조, 산불 및 화재 진압, VIP 인원 수송, 합동 상륙 훈련 등 비행 임무 수행.`,
		engWork: `Operations crew for the UH-60 Blackhawk medium-lift helicopter. Performed flight missions including assisting pilots, fighting wildfires and fires, transporting VIP personnel, and conducting joint landing exercises.`,
	},
];

export default NON_DEV_COMPANIES;
