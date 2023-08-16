import { Layout } from '../Layout/Layout';
import { PackageListingComponent } from '../../Components/PackageListingComponent';

export const PackageListing
 = ({role}) => {
    return (
        <Layout role={role}>
          <PackageListingComponent />
        </Layout>
    );
}