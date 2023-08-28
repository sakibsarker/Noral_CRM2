// @ts-nocheck
import React, { useState, useEffect } from 'react';
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
  CAlert
} from "@coreui/react-pro";
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

type Props = {
  employeeId: number;
  dropdownValues: any[];
};

const apiAdress = '../api/employees/addSalary';
const apiGetSalaryData = '../api/employees/getSalaryData';

const FormInsertEmployeeData: React.FC<Props> = (props: Props) => {
  const { employeeId, dropdownValues = [] } = props;
  const [validated, setValidated] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [monthSalaries, setMonthSalaries] = useState<Array<number>>(Array(12).fill(0));
  const [selectedCurrency, setSelectedCurrency] = useState('TL');
  const [yearsSalaries, setYearsSalaries] = useState<Record<number, number[]>>({});
  const [netSalary, setNetSalary] = useState<number>(0);
  const [netSalariesByYear, setNetSalariesByYear] = useState<Record<number, number>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [showValidation, setShowValidation] = useState(true);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYearValue = Number(e.target.value);
    setSelectedYear(selectedYearValue);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleNetSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNetSalary = parseInt(e.target.value, 10);
    setNetSalary(newNetSalary);
  };

  const currencies = dropdownValues.filter(
    (item) => item.labelCategory === "Currency"
  );

  useEffect(() => {
    getSalaryData(employeeId, selectedYear);
  }, [employeeId, selectedYear]);

  useEffect(() => {
    if (selectedYear && !yearsSalaries[selectedYear]) {
      updateMonthSalaries(selectedYear, netSalariesByYear[selectedYear] || 0);
    } else if (selectedYear) {
      setMonthSalaries(yearsSalaries[selectedYear]);
    }
  }, [selectedYear]);

  const getSalaryData = async (employeeId: number, year: number) => {
    try {
      const response = await fetch(`${apiGetSalaryData}?employeeId=${employeeId}&year=${year}`);
      const salaryData = await response.json();
      if (salaryData && Array.isArray(salaryData) && salaryData.length > 0) {
        const monthSalaries = salaryData.map((salary: any) => salary.salaryNet);
        setMonthSalaries(monthSalaries);
        setYearsSalaries({
          ...yearsSalaries,
          [year]: monthSalaries,
        });
        setNetSalariesByYear({
          ...netSalariesByYear,
          [year]: monthSalaries.reduce((sum: number, salary: number) => sum + salary, 0) / 12,
        });
      }
    } catch (error) {
      console.error('Error fetching salary data:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const dataToSend = {
          employeeId: employeeId,
          year: selectedYear,
          monthSalaries: monthSalaries,
          currency: selectedCurrency,
        };
        console.log("Data to send:", dataToSend);

        await fetch(apiAdress, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: employeeId,
            year: Number(selectedYear),
            monthSalaries: monthSalaries,
            currency: selectedCurrency,
          }),
        });

        setShowAlert(true);
        setValidated(true);
        form.reset();

        setTimeout(() => {
          setSelectedYear(2023);
          setSelectedCurrency('TL');
          setShowAlert(false);
          setShowValidation(true);
          setValidated(false);
        }, 3000);

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const applyNetSalaryToAll = () => {
    if (selectedYear) {
      const newSalaries = Array(12).fill(netSalary);
      setMonthSalaries(newSalaries);
      setYearsSalaries({
        ...yearsSalaries,
        [selectedYear]: newSalaries,
      });
    }
  };

  const updateMonthSalaries = (year: number, newNetSalary: number) => {
    if (yearsSalaries[year]) {
      const newSalaries = yearsSalaries[year].map((salary) => {
        return salary === 0 ? newNetSalary : salary;
      });
      setYearsSalaries({
        ...yearsSalaries,
        [year]: newSalaries,
      });
    } else {
      setMonthSalaries(Array(12).fill(newNetSalary));
    }
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <CForm className="row g-3 " noValidate validated={validated} onSubmit={handleSubmit}>
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
      {/* Year and Currency */}
      <CCol md={6}>
        <CFormLabel htmlFor="year">Year</CFormLabel>
        <CFormSelect
          id="year"
          required
          aria-describedby="year-feedback"
          onChange={handleYearChange}
          value={selectedYear}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </CFormSelect>
        <CFormFeedback invalid id="year-feedback">
          Please select a year.
        </CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="currency">Currency</CFormLabel>
        <CRow>
          {currencies.map((currency, index) => (
            <CCol xs={4} key={currency.idListed}>
              <CFormCheck
                id={`currency-${index}`}
                label={currency.label}
                type="radio"
                name="currency"
                value={currency.label}
                required
                checked={currency.label === selectedCurrency}
                onChange={handleCurrencyChange}
              />
            </CCol>
          ))}
        </CRow>
        <CFormFeedback invalid>Please select a currency.</CFormFeedback>
      </CCol>
      {/* Net and Gross Salary */}
      <CCol md={12}>
        <CRow className="g-3">
          <CCol md={6}>
            <CFormLabel htmlFor="salaryNet">Net Salary</CFormLabel>
            <CInputGroup className="has-validation">
              <CFormInput
                id="salaryNet"
                placeholder="Net Salary"
                type="number"
                onChange={handleNetSalaryChange}
                required
              />
              <CInputGroupText>{selectedCurrency}</CInputGroupText>
              <CButton color="primary" onClick={applyNetSalaryToAll}>
                Apply to All Months
              </CButton>
              <CFormFeedback invalid>Please enter a valid net salary.</CFormFeedback>
            </CInputGroup>
          </CCol>
          {/* ... (rest of the code) */}
        </CRow>
      </CCol>
      {/* Monthly Salary Table */}
      {selectedYear && (
        <CCol xs={12}>
          <CFormLabel>Monthly Salaries</CFormLabel>
          <CRow className="g-4">
            {monthSalaries.map((salary, index) => (
              <CCol xs={2} md={2} lg={2} key={index}>
                <CCard className="text-center">
                  <CCardHeader>{monthNames[index]} {selectedYear}</CCardHeader>
                  <CInputGroup className="has-validation">
                    <CFormInput className="text-center"
                      id={`month-${index}`}
                      placeholder={`${monthNames[index]} ${selectedYear}`}
                      type="number"
                      value={salary}
                      onChange={(e) => {
                        const newSalaries = [...monthSalaries];
                        newSalaries[index] = parseInt(e.target.value);
                        setMonthSalaries(newSalaries);

                        setYearsSalaries({
                          ...yearsSalaries,
                          [selectedYear]: newSalaries,
                        });
                      }}
                      required
                    />
                    <CInputGroupText>{selectedCurrency}</CInputGroupText>
                    <CFormFeedback invalid>Please enter a valid salary.</CFormFeedback>
                  </CInputGroup>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCol>
      )}
      {/* Submit and Reset Buttons */}
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
