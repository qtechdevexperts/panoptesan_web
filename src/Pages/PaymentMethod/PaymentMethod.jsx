import { PaymentMethodComponent } from '../../Components/PaymentMethod';
import { Layout } from '../Layout/Layout';

export const PaymentMethod = ({role}) => {
    return (
        <Layout role={role}>
          <PaymentMethodComponent />
        </Layout>
    );
}