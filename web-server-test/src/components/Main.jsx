import React from "react";
import { Container, Row, Alert } from "react-bootstrap";
import AddStudent from "./AddStudent";
import GetAllStudents from "./GetAllStudents";

function Main() {
  const [showError, setShowError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("error message");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successText, setSuccessText] = React.useState(false);

  const getErrorMessage = (error, shouldShow) => {
    setShowError(shouldShow);
    setErrorText(error);
  };

  const getSuccessMessage = (success, shouldShow) => {
    setShowSuccess(shouldShow);
    setSuccessText(success);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <div id="main-container">
      {showError && (
        <Alert variant="danger" className="swing-in-top-fwd font-weight-bold">
          Error: <span className="font-weight-normal">{errorText}</span>
        </Alert>
      )}
      {showSuccess && (
        <Alert variant="success" className="swing-in-top-fwd font-weight-bold">
          {successText}
        </Alert>
      )}

      <h1>Test Web Server</h1>
      <Container>
        <Row className="justify-content-center">
          <AddStudent getError={getErrorMessage} getSuccess={getSuccessMessage} />
          <GetAllStudents />
        </Row>
      </Container>
    </div>
  );
}

export default Main;
