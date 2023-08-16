import { Layout } from '../Layout/Layout';
import { ArchiveComponent } from '../../Components/Archive';

export const Archive = ({role}) => {
    return (
        <Layout role={role}>
          <ArchiveComponent/>
        </Layout>
    );
}