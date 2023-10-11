import React, { useEffect, useState } from 'react';
import { Edit, SelectArrayInput, TextInput, TextField,useTranslate, required,FormTab, SelectInput, minLength, maxLength, number, email, choices, ReferenceInput, AutocompleteInput,TabbedForm,RichTextField } from 'react-admin';
import { useParams } from "react-router-dom";
const privateConfig = require("../config/private-config.json");

const validateName = [required(), minLength(2), maxLength(15)];
const validateEmail = [required(), email()];
const validateLocation=[required()];
const validatForm = [required()];
const validateGender = choices(['m', 'f'], 'Please choose one of the values');

const EditUser = (props) => {
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [initialFormAssignedTo, setInitialFormAssignedTo] = useState([]);
  const [selectedFormChoices, setSelectedFormChoices] = useState([]);
   const translate = useTranslate();
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetch(`${privateConfig.development.REACT_APP_API_URL}/departments`).then((response) => response.json()),
      fetch(`${privateConfig.development.REACT_APP_API_URL}/districts`).then((response) => response.json()),
      fetch(`${privateConfig.development.REACT_APP_API_URL}/establishments`).then((response) => response.json()),
      fetch(`${privateConfig.development.REACT_APP_API_URL}/user/${id}`).then((response) => response.json()),
    ])
      .then(([departmentData, districtData, establishmentData, userData]) => {
        setDepartments(departmentData);
        setDistricts(districtData);
        setEstablishments(establishmentData);

        const formNames = userData.form_assigned_to.split(",");
        const userFormAssignedTo = formNames.map((name, index) => ({
          id: (index + 1).toString(),
          name: name.trim(),
        }));
        
        setSelectedFormChoices(userFormAssignedTo);
        setInitialFormAssignedTo(userFormAssignedTo);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, [id]);

  return (
    <Edit title={translate("ra.custom.edit")} {...props}>
      <TabbedForm>
        <FormTab label={translate("ra.custom.userDetails")}>
          <table>
            <tbody>
              <tr>
                <td>
                  <TextInput
                    source="firstname"
                    label={translate("ra.resources.users.fields.firstName")}
                    validate={validateName}
                  />
                </td>
                <td>
                  <TextInput
                    source="lastname"
                    label={translate("ra.resources.users.fields.lastName")}
                    validate={validateName}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextInput
                    source="username"
                    label={translate("ra.resources.users.fields.username")}
                    validate={validateName}
                  />
                </td>
                <td>
                  <SelectInput
                    label={translate("ra.resources.users.fields.sex")}
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
                    label={translate("ra.resources.users.fields.email")}
                    validate={validateEmail}
                  />
                </td>
                <td>
                  <TextInput
                    source="cell"
                    label={translate("ra.resources.users.fields.cell")}
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
                      label={translate("ra.resources.users.fields.department")}
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
                      label={translate("ra.resources.users.fields.district")}
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
                      label={translate(
                        "ra.resources.users.fields.establishment"
                      )}
                      optionText="nomserv"
                      optionValue="nomserv"
                    />
                  </ReferenceInput>
                </td>
                <td>
                  <SelectArrayInput
                    label={translate(
                      "ra.resources.users.fields.formsAssignedTo"
                    )}
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
    </Edit>
  );
}

export default EditUser;