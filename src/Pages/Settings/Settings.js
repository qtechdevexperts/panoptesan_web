import { Layout } from '../Layout/Layout';
import { ArchiveComponent } from '../../Components/Archive';
import { SettingsPageComponent } from '../../Components/Settings';

export const Settings = ({role}) => {
    return (
        <Layout role={role}>
          <SettingsPageComponent role={role}/>
        </Layout>
    );
}