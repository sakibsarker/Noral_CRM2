// @ts-nocheck
import React, { useState } from 'react';
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
  CFormFeedback,
} from "@coreui/react-pro";

type Props = {
  employeeId: number;
  dropdownValues: any[];
};

// const ContractValidation =`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/ContractValidation`;
const ContractValidation ="/api/employees/ContractValidation";

const FormInsertEmployeeData = (props: Props) => {
  const { employeeId } = props;
  const [validated, setValidated] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newContract = {
        employeeId: employeeId,
        idCompany: form.idCompany.value,
        contractTypeId: form.contractTypeId.value,
        jobTypeId: form.jobTypeId.value,
        jobTitleId: form.jobTitleId.value,
        description: form.description.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value || null,
      };

      console.log("Form Data:", {
        newContract: newContract,
      });

      try {
        const contractResponse = await fetch(ContractValidation, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContract),
        });

        console.log("Contract Response:", contractResponse);
        setValidated(true);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const companies = props.dropdownValues?.filter(
    (item) => item.labelCategory === "Company"
  ) || [];
  const contractTypes = props.dropdownValues?.filter(
    (item) => item.labelCategory === "Contract Type"
  ) || [];
  const jobTypes = props.dropdownValues?.filter(
    (item) => item.labelCategory === "Job Type"
  ) || [];
  const jobTitles = props.dropdownValues?.filter(
    (item) => item.labelCategory === "Job Title"
  ) || [];
  

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Employment Contract */}
      <CCol md={3}>
        <CFormLabel htmlFor="idCompany">Company</CFormLabel>
        <CFormSelect id="idCompany" required aria-describedby="company-feedback">
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.idListed} value={company.idListed}>
              {company.label}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid id="company-feedback">
          Please select a company.
        </CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="contractTypeId">Contract Type</CFormLabel>
        <CFormSelect id="contractTypeId" required aria-describedby="contractTypeId-feedback">
          <option value="">Select a contract type</option>
          {contractTypes.map((contractType) => (
            <option key={contractType.idListed} value={contractType.idListed}>
              {contractType.label}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid id="contractTypeId-feedback">
          Please select a contract type.
        </CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="jobTypeId">Job Type</CFormLabel>
        <CFormSelect id="jobTypeId" required aria-describedby="jobTypeId-feedback">
          <option value="">Select a job type</option>
          {jobTypes.map((jobType) => (
            <option key={jobType.idListed} value={jobType.idListed}>
              {jobType.label}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid id="jobTypeId-feedback">
          Please select a job type.
        </CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="jobTitleId">Job Title</CFormLabel>
        <CFormSelect id="jobTitleId" required aria-describedby="jobTitleId-feedback">
          <option value="">Select a job title</option>
          {jobTitles.map((jobTitle) => (
            <option key={jobTitle.idListed} value={jobTitle.idListed}>
              {jobTitle.label}
            </option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid id="jobTitleId-feedback">
          Please select a job title.
        </CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="description">Description</CFormLabel>
        <CFormInput id="description" placeholder="Description" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
        <CFormInput id="startDate" placeholder="Start Date" type="date" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormCheck
          id="terminatedEmployee"
          type="checkbox"
          label="Former Employee?"
          onChange={(e) => setShowEndDate(e.target.checked)}
        />
      </CCol>
      {showEndDate && (
        <CCol md={3}>
          <CFormLabel htmlFor="endDate">End Date (optional)</CFormLabel>
          <CFormInput
            id="endDate"
            placeholder="End Date"
            type="date"
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
      )}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit
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

export default FormInsertEmployeeData;
