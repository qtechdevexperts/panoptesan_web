import React from 'react'
import { Layout } from '../Layout/Layout';
import { CreatePackageComponent } from '../../Components/CreatePackage/CreatePackage';

export const CreatePackagePage = ({role}) => {
    return (
        <Layout role={role}>
          <CreatePackageComponent />
        </Layout>
    );
}