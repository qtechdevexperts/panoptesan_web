import { Layout } from '../Layout/Layout';
import { NotificationsComponent } from '../../Components/Notifications';

export const NotificationsListing
 = ({role}) => {
    return (
        <Layout role={role}>
          <NotificationsComponent />
        </Layout>
    );
}