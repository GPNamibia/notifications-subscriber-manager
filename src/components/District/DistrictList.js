import React from 'react'
import {List,Datagrid,TextField,DateField,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './DistrictList.css';
import CustomDateField from '../Date/CustomDateField';

const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomdist" alwaysOn />
  </Filter>
);

const datagridStyle = {
    backgroundColor: '#f0f0f0'
  };

const DistrictList = (props) => {
  
  return (
     <div>
        <h2 className="user-list-title">EBS ODK Districto</h2>
       <List {...props} filters={<UserFilter />} pagination={false} perPage={5}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id"/> */}
        <TextField source="coddpto" />
        <TextField source="coddist" />
         <TextField source="nomdist" />
        <CustomDateField source="createdAt" label="Created At" />
        <CustomDateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
     </div>
  );
};

export default DistrictList
