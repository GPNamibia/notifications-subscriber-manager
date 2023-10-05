import React, { useState, useEffect } from "react";
import "./Unsubscribe.css";
import { useParams } from "react-router-dom";
import { useLogin, useNotify } from "react-admin";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${id}`);
        const data = await response.json();
        setEmail(data.email);

        const formAssignedToArray = data.form_assigned_to.split(",");
        if (Array.isArray(formAssignedToArray)) {
          setSubscribedForms(formAssignedToArray);
        } else {
          console.error("Form data is not an array:", formAssignedToArray);
        }
      } catch (error) {
        console.error("Error fetching subscribed forms:", error);
      }
    };

    const fetchDropdownData = async () => {
      try {
        // Fetch department data
        const departmentResponse = await fetch(
          "http://localhost:8000/departments"
        );
        const departmentData = await departmentResponse.json();
        setDepartments(departmentData);

        // Fetch district data
        const districtResponse = await fetch("http://localhost:8000/districts");
        const districtData = await districtResponse.json();
        setDistricts(districtData);

        // Fetch establishment data
        const establishmentResponse = await fetch(
          "http://localhost:8000/establishments"
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

//   const toggleForm = (formName) => {
//     setSelectedForms((prevState) =>
//       prevState.includes(formName)
//         ? prevState.filter((form) => form !== formName)
//         : [...prevState, formName]
//     );
//   };

  const handleUnsubscribe = async () => {
    try {
      // Send a request to unsubscribe from the selected forms
      await fetch(`http://localhost:8000/unsubscribe/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ forms: selectedForms }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success and update UI as needed
      notify("Unsubscribed successfully!");
    } catch (error) {
      notify("Error unsubscribing:", error);
    }
  };

  const handleUpdateUserDetails = async () => {
    if (!selectedDepartment || !selectedDistrict || !selectedEstablishment) {
      notify(
        "Please select values for department, district, and establishment."
      );
      return;
    }
    try {
      // Send a request to update user details
      await fetch(`http://localhost:8000/user/${id}`, {
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

  return (
    <div className="unsubscribe-container">
      <div className="container">
        <h1>Unsubscribe</h1>
        <p>Your email address: {email}</p>
        <div className="dropdown-container">
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
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
            <option value="">Select District</option>
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
            <option value="">Select Establishment</option>
            {establishments.map((establishment) => (
              <option key={establishment.id} value={establishment.nomserv}>
                {establishment.nomserv}
              </option>
            ))}
          </select>
        </div>
        <button
          className="unsubscribe-button"
          onClick={handleUpdateUserDetails}
        >
          Update Your Details
        </button>
        <p>
          You will not receive any more emails from this email.You can
          unsubscribe:
        </p>
        <p>Forms subscribed to</p>
        {subscribedForms.length > 0 ? (
          <ul>
            {subscribedForms.map((formName) => (
              <li key={formName}>{formName}</li>
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
