import { Layout } from 'react-admin';

import { MyAppBar } from './AppBar';
import { MyMenu } from './Menu';

export const MyLayout = props => <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;