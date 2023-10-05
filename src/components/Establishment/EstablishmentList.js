import React from 'react'
import {List,Datagrid,TextField,DateField,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './EstablishmentList.css';
import CustomDateField from '../Date/CustomDateField';



const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomserv" alwaysOn />
  </Filter>
);

const datagridStyle = {
    backgroundColor: '#f0f0f0'
  }

const EstablishmentList = (props) => {
  return (
      <div>
        <h2 className="user-list-title">EBS ODK Establishmento</h2>
    <List {...props} filters={<UserFilter /> } pagination={false} perPage={5}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id"/> */}
        <TextField source="coddist" />
        <TextField source="tiposerv" />
        <TextField source="nomserv" />
        <CustomDateField source="createdAt" label="Created At" />
        <CustomDateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
      </div>
  );
};

export default EstablishmentList
