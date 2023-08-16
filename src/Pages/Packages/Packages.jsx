import { Layout } from '../Layout/Layout';
import { PackagesComponent } from '../../Components/Packages';

export const Packages = ({role}) => {
    return (
        <Layout role={role}>
          <PackagesComponent/>
        </Layout>
    );
}