import React from 'react'
import {List,Datagrid,TextField,useTranslate,DeleteButton,EditButton,Filter,TextInput,SearchInput} from 'react-admin';
import './DistrictList.css';
import CustomDateField from '../Date/CustomDateField';


const datagridStyle = {
    backgroundColor: '#f0f0f0'
  };

const DistrictList = (props) => {
 const translate = useTranslate();

  const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="nomdist" alwaysOn placeholder={translate("ra.search.search")} />
  </Filter>
);
  
  return (
     <div>
        <h2 className="user-list-title">EBS ODK Districto</h2>
       <List {...props} filters={<UserFilter />} pagination={false} perPage={5}>
      <Datagrid style={datagridStyle}>
        {/* <TextField source="id"/> */}
        <TextField source="coddpto" label={translate("ra.resources.location.fields.coddpto")} />
        <TextField source="coddist" label={translate("ra.resources.location.fields.coddist")}/>
         <TextField source="nomdist" label={translate("ra.resources.location.fields.district")}/>
         <CustomDateField source="createdAt" label={translate("ra.resources.users.fields.createdAt")} />
        <CustomDateField source="updatedAt" label={translate("ra.resources.users.fields.updatedAt")} />
      </Datagrid>
    </List>
     </div>
  );
};

export default DistrictList
