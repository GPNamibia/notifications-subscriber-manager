import React from 'react'
import {List,Datagrid,TextField,DateField,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './DepartmentList.css';
import CustomDateField from '../Date/CustomDateField';

const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomdpto" alwaysOn />
  </Filter>
);

const datagridStyle = {
    backgroundColor: '#f0f0f0'
  };



const DepartmentList = (props) => {
  return (
    <div>
      <h2 className="user-list-title">EBS ODK Deparmento</h2>
      <List {...props} filters={<UserFilter />} perPage={5} pagination={false}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id" className="bold-column" /> */}
        <TextField source="coddpto" />
        <TextField source="nomdpto" />
        <CustomDateField source="createdAt" label="Created At" />
        <CustomDateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
    </div>
  );
};

export default DepartmentList
