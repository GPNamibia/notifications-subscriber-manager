import React from 'react'
import {Admin,Resource, CustomRoutes,useCreate} from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from './components/User/UserList'
import DepartmentList from './components/Department/DepartmentList'
import DistrictList from './components/District/DistrictList'
import EstablishmentList from './components/Establishment/EstablishmentList'
import UserCreate from './components/User/UserCreate'
import EditUser from './components/User/EditUser'
import { i18nProvider } from '../src/components/i18nProvider';
import { MyLayout } from './components/Layout';
import PeopleIcon from '@mui/icons-material/People';
import authProvider from './components/Authentication/authProvider';
import CustomLoginPage from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Unsubscribe from './components/Subscription/Unsubscribe';


function App() {
  return (
    <Admin  authProvider={authProvider} loginPage={CustomLoginPage} dataProvider={restProvider('http://127.0.0.1:8000')}
        i18nProvider={i18nProvider}
        layout={MyLayout}>
      <Resource name='user' list={UserList} create={UserCreate} edit={EditUser} icon={PeopleIcon}/>
       <Resource name='departments' list={DepartmentList}/>
       <Resource name='districts' list={DistrictList} />
       <Resource name='establishments' list={EstablishmentList} />
      <CustomRoutes noLayout>
            <Route path="/unsubscribe/:id" element={<Unsubscribe />} />
        </CustomRoutes>
    </Admin>
    
  );
}

export default App;
