import React from 'react'
import {List,Datagrid,TextField,useTranslate,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './DepartmentList.css';
import CustomDateField from '../Date/CustomDateField';

const datagridStyle = {
    backgroundColor: '#f0f0f0'
  };



const DepartmentList = (props) => {
  const translate = useTranslate();

  const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomdpto" alwaysOn placeholder={translate("ra.search.search")} />
  </Filter>
);

  return (
    <div>
      <h2 className="user-list-title">{translate("ra.resources.location.nameDep")}</h2>
      <List {...props} filters={<UserFilter />} perPage={5} pagination={false}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id" className="bold-column" /> */}
        <TextField source="coddpto" label={translate("ra.resources.location.fields.coddpto")} />
        <TextField source="nomdpto" label={translate("ra.resources.location.fields.department")}/>
        <CustomDateField source="createdAt" label={translate("ra.resources.users.fields.createdAt")} />
        <CustomDateField source="updatedAt" label={translate("ra.resources.users.fields.updatedAt")} />
      </Datagrid>
    </List>
    </div>
  );
};

export default DepartmentList
