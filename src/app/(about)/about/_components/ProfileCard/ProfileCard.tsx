'use client';

import ProfileDescription from './ProfileDescription/ProfileDescription';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import { profileCard } from './ProfileCard.css';

const ProfileCard = () => {
  return (
    <AppearBottom>
      <div className={profileCard}>
        <ProfilePicture />
        <ProfileDescription />
      </div>
    </AppearBottom>
  );
};

export default ProfileCard;
