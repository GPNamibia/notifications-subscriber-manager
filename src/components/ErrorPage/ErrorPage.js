import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="container">
        <h1>Authentication Error</h1>
        <p>Sorry, an error occurred. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
