import React, { useState, useEffect } from "react";
import "./Unsubscribe.css";
import { useParams, useLocation,useNavigate} from "react-router-dom";
import { useLogin, useNotify, useRefresh, useTranslate,useSetLocale } from "react-admin";
const privateConfig = require("../config/private-config.json");

const Unsubscribe = () => {
  const [subscribedForms, setSubscribedForms] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedEstablishment, setSelectedEstablishment] = useState("");
  const notify = useNotify();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = new URLSearchParams(location.search).get("user_id");
  const translate = useTranslate();
  const setLocale = useSetLocale(); 
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${privateConfig.development.REACT_APP_API_URL}/user/${id}`
        );
        const data = await response.json();

        // Check if the user's token matches the one in the URL
        // if (data.token === userToken) {
          setEmail(data.email);
          setSelectedDepartment(data.nomdpto);
          setSelectedDistrict(data.nomdist);
          setSelectedEstablishment(data.nomserv);

          const formAssignedToArray = data.form_assigned_to.split(",");
          if (Array.isArray(formAssignedToArray)) {
            setSubscribedForms(formAssignedToArray);
          } else {
            console.error("Form data is not an array:", formAssignedToArray);
          }
        // } else {
        //   navigate("/error");
        // }
      } catch (error) {
        console.error("Error fetching subscribed forms:", error);
      }
    };

    const fetchDropdownData = async () => {
      try {
        // Fetch department data
        const departmentResponse = await fetch(
          `${privateConfig.development.REACT_APP_API_URL}/departments`
        );
        const departmentData = await departmentResponse.json();
        setDepartments(departmentData);

        // Fetch district data
        const districtResponse = await fetch(
          `${privateConfig.development.REACT_APP_API_URL}/districts`
        );
        const districtData = await districtResponse.json();
        setDistricts(districtData);

        // Fetch establishment data
        const establishmentResponse = await fetch(
          `${privateConfig.development.REACT_APP_API_URL}/establishments`
        );
        const establishmentData = await establishmentResponse.json();
        setEstablishments(establishmentData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchUserData();
    fetchDropdownData();
  }, [id]);

  // handleFormSelection function
  const handleFormSelection = (formName) => {
    if (selectedForms.includes(formName)) {
      setSelectedForms(selectedForms.filter((name) => name !== formName));
    } else {
      setSelectedForms([...selectedForms, formName]);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await fetch(
        `${privateConfig.development.REACT_APP_API_URL}/unsubscribe/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ forms: selectedForms.join(", ")} ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle success and update UI as needed
      notify("Unsubscribed successfully!");
      refresh();
    } catch (error) {
      notify("Error unsubscribing:", error);
    }
  };

  const handleUpdateUserDetails = async () => {
    try {
      // Send a request to update user details
      await fetch(`${privateConfig.development.REACT_APP_API_URL}/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nomdpto: selectedDepartment,
          nomdist: selectedDistrict,
          nomserv: selectedEstablishment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      notify("User details updated successfully!");
    } catch (error) {
      notify("Error updating user details:", error);
    }
  };

  const changeLanguage = (locale) => {
    setLocale(locale);
  };

  return (
    <div className="unsubscribe-container">
      <div className="container">
        <div className="language-toggle">
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("es")}>Español</button>
        </div>
        <h1>{translate("ra.resources.users.fields.managePreferences")}</h1>
        <p>{translate("ra.resources.users.fields.yourEmailAddress")}: {email}</p>
        <div className="dropdown-container">
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">{selectedDepartment}</option>
            {departments.map((department) => (
              <option key={department.id} value={department.nomdpto}>
                {department.nomdpto}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">{selectedDistrict}</option>
            {districts.map((district) => {
              return (
                <option key={district.id} value={district.nomdist}>
                  {district.nomdist}
                </option>
              );
            })}
          </select>
        </div>
        <div className="dropdown-container">
          <select
            id="establishment"
            value={selectedEstablishment}
            onChange={(e) => setSelectedEstablishment(e.target.value)}
          >
            <option value="">{selectedEstablishment}</option>
            {establishments.map((establishment) => (
              <option key={establishment.id} value={establishment.nomserv}>
                {establishment.nomserv}
              </option>
            ))}
          </select>
        </div>

        <button
          className="unsubscribe-button"
          onClick={handleUpdateUserDetails}>
          {translate("ra.resources.users.fields.updateYourDetails")}
        </button>
        <p>
          {translate("ra.resources.users.fields.unsubscribeDescription")}:
        </p>
        <p> {translate("ra.resources.users.fields.formsSubscribedTo")} : </p>
        {subscribedForms.length > 0 ? (
          <ul>
            {subscribedForms.map((formName) => (
              <li key={formName}>
                <label>
                  <input
                    type="checkbox"
                    id={formName}
                    name={formName}
                    value={formName}
                    checked={selectedForms.includes(formName)}
                    onChange={() => handleFormSelection(formName)}
                  />
                  {formName}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>No subscribed forms found.</p>
        )}

        <button className="unsubscribe-button" onClick={handleUnsubscribe}>
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default Unsubscribe;
