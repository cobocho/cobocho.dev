import styled from 'styled-components';

const ProfileDescription = () => {
  return (
    <Container>
      <h2>
        안녕하세요, <br />
        프론트엔드 지망생 <em>김민규</em>입니다.
      </h2>
      <p>몰입과 경험을 중요시합니다.</p>
      <p>
        익숙하지 않은 기술을 사용하는 것에 흥미를 느끼며 코드를 작성할 때 다양한 접근법을 통해 구현하는 것을 즐깁니다.
      </p>
      <p>협업 간 커뮤니케이션을 통한 공유와 짧은 간격의 피드백을 통한 발전을 추구합니다.</p>
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;

  h2 {
    width: fit-content;
    margin-bottom: 20px;
    font-size: 26px;
  }

  em {
    font-weight: 700;
  }

  p {
    word-break: keep-all;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export default ProfileDescription;
