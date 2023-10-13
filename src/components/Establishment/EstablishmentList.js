import React from 'react'
import {List,Datagrid,TextField,useTranslate,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './EstablishmentList.css';
import CustomDateField from '../Date/CustomDateField';


const datagridStyle = {
    backgroundColor: '#f0f0f0'
  }

const EstablishmentList = (props) => {
  const translate = useTranslate();

  const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomserv" alwaysOn placeholder={translate("ra.search.search")}/>
  </Filter>
);

  return (
      <div>
        <h2 className="user-list-title">EBS ODK Establishmento</h2>
    <List {...props} filters={<UserFilter /> } pagination={false} perPage={5}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id"/> */}
         <TextField source="coddist" label={translate("ra.resources.location.fields.coddist")}/>
        <TextField source="tiposerv" label={translate("ra.resources.location.fields.tiposer")}/>
        <TextField source="nomserv" label={translate("ra.resources.location.fields.establishment")}/>
        <CustomDateField source="createdAt" label={translate("ra.resources.users.fields.createdAt")} />
        <CustomDateField source="updatedAt" label={translate("ra.resources.users.fields.updatedAt")} />
      </Datagrid>
    </List>
      </div>
  );
};

export default EstablishmentList
