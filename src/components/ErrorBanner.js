import React from "react";
import Alert from "react-bootstrap/Alert";

const ErrorBanner = ({ message }) => {
  if (!message) return null;

  return (
    <Alert variant="warning" className="mb-3">
      {message}
    </Alert>
  );
};

export default ErrorBanner;
