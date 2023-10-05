import React, { useState ,useEffect} from 'react';
import { Box, Card, Typography } from '@mui/material';
import {List,Datagrid,useListContext,useNotify,TextField,DateField,DeleteButton,EditButton,Filter,TextInput,SearchInput,FilterButton,InfinitePagination} from 'react-admin';
import './UserList.css'
import { Button } from 'react-admin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomDateField from '../Date/CustomDateField';

const UserList = (props) => {
  const notify = useNotify();

  const datagridStyle = {
    backgroundColor: "#f0f0f0"
  };

  const UserFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="firstname" alwaysOn />
    </Filter>
  );

  return (
    <div>
      <h2 className="user-list-title">EBS ODK User</h2>
      <div >
        <List {...props} filters={<UserFilter />} pagination={false}>
          <Datagrid style={datagridStyle}>
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="username" />
            <TextField source="sex" />
            <TextField source="form_assigned_to" />
            <TextField source="email" />
            <TextField source="cell" />
            <TextField source="nomdpto" />
            <TextField source="nomdist" />
            <TextField source="nomserv" />
            <CustomDateField source="createdAt" label="Created At" />
            <CustomDateField source="updatedAt" label="Updated At" />
            <EditButton basePath="/user" />
          </Datagrid>
        </List>
      </div>
    </div>
  );
};

export default UserList
