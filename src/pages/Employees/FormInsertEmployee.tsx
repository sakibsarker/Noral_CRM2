
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormCheck,
  CButton,
  CAlert,
  CFormFeedback,
} from "@coreui/react-pro";
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';
import { useState } from "react";
import { EmployeeProps } from "@/components/Employees";

type Props = {
  feed: EmployeeProps[];
  dropdownValues: any[];
  apiRoute?: String[];
};

// const apiEmployee = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/addEmployee`;
const apiEmployee = "/api/employees/addEmployee";


const FormInsertEmployee = (props: Props) => {
  const situations = (props.dropdownValues || []).filter(
    (item) => item.labelCategory === "Situation"
  );
  const [showAlert, setShowAlert] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showValidation, setShowValidation] = useState(true);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const newEmployee = {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          birthDate: form.birthDate.value,
          email: form.email.value,
          phoneNumber: form.phoneNumber.value,
          situationId: form.situation.value,
          disabled: form.disabled.checked,
          photo: "/images/employee.jpg",
        };

        await fetch(apiEmployee, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        });

        // Show the alert and reset the form
        setShowAlert(true);
        setValidated(true);
        form.reset();

        // Hide the alert after 3 seconds and reset default values
        setTimeout(() => {
          setShowAlert(false);
          setShowValidation(true);
          setValidated(false);
        }, 3000);

      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  return (
    <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
      {showAlert && (
        <CAlert
          color="success"
          className="d-flex align-items-center"
          onClose={() => {
            setShowAlert(false);
            setTimeout(() => {
              setShowValidation(false);
            }, 3000);
          }}
        >
          <CIcon
            icon={cilCheckCircle}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div>Data has been successfully inserted!</div>
        </CAlert>
      )}
      <CCol md={6}>
        <CFormLabel htmlFor="firstName">First Name</CFormLabel>
        <CFormInput id="firstName" placeholder="First Name" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
        <CFormInput id="lastName" placeholder="Last Name" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="birthDate">Birth Date</CFormLabel>
        <CFormInput id="birthDate" placeholder="Birth Date" type="date" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="email">Email</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>@</CInputGroupText>
          <CFormInput id="email" placeholder="Email" type="email" required />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>+33</CInputGroupText>
          <CFormInput id="phoneNumber" placeholder="Phone Number" type="number" required />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CInputGroup>
        <CFormFeedback invalid id="phoneNumber-feedback">
          Please enter a phone number.
        </CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="situation">Situation</CFormLabel>
        <CFormSelect id="situation" required aria-describedby="situation-feedback">
          <option value="">Select a situation</option>
          {situations.map((situation) => (
            <option key={situation.idListed} value={situation.idListed}>
              {situation.label}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid id="situation-feedback">
          Please select a situation.
        </CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="photo">Photo</CFormLabel>
        <CFormInput id="photo" type="file" accept="image/*" />
      </CCol>
      <CCol md={6}>
        <CFormLabel>Disabled</CFormLabel>
        <CFormCheck
          type="checkbox"
          id="disabled"
          label="Check if employee is disabled"
        />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Add
        </CButton>
        {"     "}
        <CButton
          type="reset"
          onClick={() => {
            setValidated(false);
          }}
        >
          Reset
        </CButton>
      </CCol>
    </CForm>
  );
};

export default FormInsertEmployee;
