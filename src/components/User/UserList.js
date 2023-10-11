import React, { useState ,useEffect} from 'react';
import { Box, Card, Typography } from '@mui/material';
import {List,Datagrid,useTranslate,useNotify,TextField,ExportButton,DeleteButton,EditButton,Filter,TextInput,SearchInput,FilterButton,InfinitePagination} from 'react-admin';
import { Button } from 'react-admin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomDateField from '../Date/CustomDateField';



const UserList = (props) => {
  const notify = useNotify();
  const translate = useTranslate();

  const datagridStyle = {
    backgroundColor: "#f0f0f0"
  };

  const UserFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="firstname" alwaysOn  placeholder={translate("ra.search.search")} />
    </Filter>
  );

  return (
    <div>
      {/* <h2 className="user-list-title">EBS ODK User</h2> */}
      <h2 className="user-list-title">{translate("ra.resources.users.name")}</h2>
      <div>
        <List {...props} filters={<UserFilter />} pagination={false}>
          <Datagrid style={datagridStyle}>
            <TextField source="firstname" label={translate("ra.resources.users.fields.firstName")} />
            <TextField source="lastname" label={translate("ra.resources.users.fields.lastName")}/>
            <TextField source="username" label={translate("ra.resources.users.fields.username")}/>
            <TextField source="sex" label={translate("ra.resources.users.fields.sex")}/>
            <TextField source="form_assigned_to" label={translate("ra.resources.users.fields.formsAssignedTo")}/>
            <TextField source="email" label={translate("ra.resources.users.fields.email")}/>
            <TextField source="cell" label={translate("ra.resources.users.fields.cell")}/>
            <TextField source="nomdpto" label={translate("ra.resources.users.fields.department")}/>
            <TextField source="nomdist" label={translate("ra.resources.users.fields.district")}/>
            <TextField source="nomserv" label={translate("ra.resources.users.fields.establishment")}/>
            <CustomDateField source="createdAt" label={translate("ra.resources.users.fields.createdAt")} />
            <CustomDateField source="updatedAt" label={translate("ra.resources.users.fields.updatedAt")} />
            <EditButton basePath="/user" label={translate("ra.resources.users.fields.editButtonLabel")} />
          </Datagrid>
        </List>
      </div>
    </div>
  );
};

export default UserList
