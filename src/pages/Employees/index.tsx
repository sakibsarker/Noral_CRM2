// @ts-nocheck
import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../../../lib/prisma";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
} from "@coreui/react-pro";
import { DashboardLayout } from "@/components";
import TableEmployees from "./TableEmployees";
import FormInsertEmployee from "./FormInsertEmployee";
import { EmployeeProps } from "@/components/Employees";
import WidgetsBrand from '@/pages/components/widgets/WidgetsBrand'
import WidgetsDropdown from '@/pages/components/widgets/WidgetsDropdown'


export const getStaticProps: GetStaticProps = async () => {
  const [feed, dropdownValues, salaries] = await Promise.all([
    prisma.employee.findMany(),
    prisma.dropdownValues.findMany(),
    prisma.salaries.findMany(),
  ]);

  const feedJSON = feed.map((employee) => ({
    ...employee,
    birthDate: employee.birthDate.toJSON(),
  }));

  return {
    props: { feed: feedJSON, dropdownValues, salaries },
    revalidate: 10,
  };
};

type Props = {
  feed: EmployeeProps[];
  dropdownValues: any[];
  salaries: any[];
};

const getMonthlySalarySums = (salaries) => {
  const monthlySums = Array(12).fill(0);
  if (salaries) {
    salaries.forEach((salary) => {
      monthlySums[salary.month - 1] += salary.salaryNet;
    });
  }
  return monthlySums;
};

const SmartTable: React.FC<Props> = (props) => {
  const [showEmployees, setShowEmployees] = useState(true);
  const [showAddEmployees, setShowAddEmployees] = useState(false);
  const [showDetail, setDetail] = useState(true);
  const monthlySalarySums = getMonthlySalarySums(props.salaries);

  return (
    <CRow>
      {/* Widgets with employee status */}
      <WidgetsDropdown />

      <CCol xs={12}>
        {/* List of employees */}
        <CCard className="mb-4">
          <CCardHeader onClick={() => setShowEmployees(!showEmployees)}>
            <h5>
              <strong>List of Employees</strong>
            </h5>
          </CCardHeader>
          <CCollapse visible={showEmployees}>
            <CCardBody>
              <TableEmployees
                feed={props.feed}
                dropdownValues={props.dropdownValues}
              />
            </CCardBody>
          </CCollapse>
        </CCard>
        {/* Add Employees Form */}
        <CCard className="mb-4">
          <CCardHeader onClick={() => setShowAddEmployees(!showAddEmployees)}>
            <h5>
              {" "}
              <strong>Add New Employees</strong>
            </h5>
          </CCardHeader>
          <CCollapse visible={showAddEmployees}>
            <CCardBody>
              <FormInsertEmployee
                feed={props.feed}
                dropdownValues={props.dropdownValues}
              />
            </CCardBody>
          </CCollapse>
        </CCard>
        {/* Social Media Widgets */}
        <WidgetsBrand withCharts />
      </CCol>

    </CRow>
  );
};

SmartTable.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SmartTable;
