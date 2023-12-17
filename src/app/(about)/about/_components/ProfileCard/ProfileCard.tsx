'use client';

import styled from 'styled-components';
import ProfileDescription from './ProfileDescription/ProfileDescription';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

const ProfileCard = () => {
  return (
    <AppearBottom>
      <Container>
        <ProfilePicture />
        <ProfileDescription />
      </Container>
    </AppearBottom>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export default ProfileCard;
