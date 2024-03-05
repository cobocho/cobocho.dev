'use client';

import AppearBottom from '@/app/_components/Motion/AppearBottom';

import { profileCard } from './ProfileCard.css';
import ProfileDescription from './ProfileDescription/ProfileDescription';
import ProfilePicture from './ProfilePicture/ProfilePicture';

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
