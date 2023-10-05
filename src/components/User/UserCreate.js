import React, { useEffect, useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  EmailField,
  required,
  FormTab,
  SelectInput,
  minLength,
  maxLength,
  number,
  email,
  choices,
  ReferenceInput,
  AutocompleteInput,
  TabbedForm,
  SelectArrayInput,
} from "react-admin";

const validateName = [required(), minLength(2), maxLength(15)];
const validateEmail = [required(), email()];
const validateLocation=[required()];
const validatForm = [required()];
const validateGender = choices(['m', 'f'], 'Please choose one of the values');

const UserCreate = (props) => {
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    // Fetch departments
    fetch('http://localhost:8000/department')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments', error));

    // Fetch districts
    fetch('http://localhost:8000/district')
      .then(response => response.json())
      .then(data => setDistricts(data))
      .catch(error => console.error('Error fetching districts', error));

    // Fetch establishments
    fetch('http://localhost:8000/establishment')
      .then(response => response.json())
      .then(data => setEstablishments(data))
      .catch(error => console.error('Error fetching establishments', error));
  }, []);

    return (
      <Create title="Create a User" {...props}>
        <TabbedForm>
          <FormTab label="User Details">
            <table>
              <tbody>
                <tr>
                  <td>
                    <TextInput
                      source="firstname"
                      label="First Name"
                      validate={validateName}
                    />
                  </td>
                  <td>
                    <TextInput
                      source="lastname"
                      label="Last Name"
                      validate={validateName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextInput
                      source="username"
                      label="Username"
                      validate={validateName}
                    />
                  </td>
                  <td>
                    <SelectInput
                      label="Gender"
                      source="sex"
                      choices={[
                        { id: "m", name: "Male" },
                        { id: "f", name: "Female" },
                      ]}
                      validate={validateGender}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextInput
                      source="email"
                      label="Email"
                      validate={validateEmail}
                    />
                  </td>
                  <td>
                    <TextInput
                      source="cell"
                      label="Cell"
                      validate={validatForm}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReferenceInput
                      source="nomdpto"
                      reference="departments"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        optionText="nomdpto"
                        optionValue="nomdpto"
                      />
                    </ReferenceInput>
                  </td>
                  <td>
                    <ReferenceInput
                      source="nomdist"
                      reference="districts"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        optionText="nomdist"
                        optionValue="nomdist"
                      />
                    </ReferenceInput>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReferenceInput
                      source="nomserv"
                      reference="establishments"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        optionText="nomserv"
                        optionValue="nomserv"
                      />
                    </ReferenceInput>
                  </td>
                  <td>
                    <SelectArrayInput
                      label="Forms Assigned To"
                      source="form_assigned_to"
                      choices={[
                        { id: "1", name: "Signal Detection" },
                        { id: "2", name: "Triage" },
                        { id: "3", name: "Verification" },
                        { id: "4", name: "Risk Assessment" },
                      ]}
                      optionValue="name"
                      validate={validatForm}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </FormTab>
        </TabbedForm>
      </Create>
    );
}

export default UserCreate;
