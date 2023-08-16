import React from 'react'
import { Layout } from '../Layout/Layout';
import { ProfilePageComponent } from '../../Components/Profile/profilePage';
import { ProfileEditPageComponent } from '../../Components/ProfileEdit/profileEditPage';

export const ProfileEdit = ({role}) => {
    return (
        <Layout role={role}>
          <ProfileEditPageComponent />
        </Layout>
    );
}