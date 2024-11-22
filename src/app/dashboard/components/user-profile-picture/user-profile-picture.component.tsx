'use client';
import { ProfilePicture } from '@/common/components/profile-picture';
import { useUserProvider } from '@/common/providers/user-provider';

export const UserProfilePicture = () => {
  const { user } = useUserProvider();
  return user && user !== 'unlogged' ? (
    <>
      <h1 className="text-2xl">
        Hello, <br /> <strong>{user.displayName}!</strong>
      </h1>
      <ProfilePicture
        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'NA'}`}
        alt={`${user.displayName || 'NA'} Profile Picture`}
        size={55}
      />
    </>
  ) : (
    <></>
  );
};
