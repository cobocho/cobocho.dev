import { profileDescription } from './ProfileDescription.css';

const ProfileDescription = () => {
  return (
    <div className={profileDescription}>
      <h2>
        안녕하세요, <br />
        프론트엔드 지망생 <em>김민규</em>입니다.
      </h2>
      <p>몰입과 경험을 중요시합니다.</p>
      <p>
        익숙하지 않은 기술을 사용하는 것에 흥미를 느끼며 코드를 작성할 때 다양한 접근법을 통해
        구현하는 것을 즐깁니다.
      </p>
      <p>협업 간 커뮤니케이션을 통한 공유와 짧은 간격의 피드백을 통한 발전을 추구합니다.</p>
    </div>
  );
};

export default ProfileDescription;
