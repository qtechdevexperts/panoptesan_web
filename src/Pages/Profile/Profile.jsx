import React from 'react'
import './Profile.css'
import { Layout } from '../Layout/Layout';
import { ProfilePageComponent } from '../../Components/Profile/profilePage';

export const Profile = ({role}) => {
    return (
        <Layout role={role}>
          <ProfilePageComponent/>
        </Layout>
    );
}