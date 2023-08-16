import { Layout } from '../Layout/Layout';
import { SupportComponent } from '../../Components/Support';

export const Support = ({role}) => {
    return (
        <Layout role={role}>
          <SupportComponent />
        </Layout>
    );
}