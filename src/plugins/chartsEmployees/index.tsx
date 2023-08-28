import { CCard, CCardBody, CCol, CCardHeader, CRow, CButton } from '@coreui/react-pro'

import { DashboardLayout, DocsLink } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'
import { useEffect, useRef, useState } from 'react'
import Graph1 from './Graph1';
import DonutChart from './Chart-donut';
import AreaChart  from './Chart-stacked-area';
import React from "react"
import { EmployeeProps } from "../../../components/Employees"
import { GetStaticProps } from "next"
import prisma from '../../../../lib/prisma'
import PriceCurveChart from './Chart';

export const getStaticProps: GetStaticProps = async () => {
  const [feed] = await Promise.all([
    prisma.employee.findMany(),

  ]);

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: EmployeeProps[],
};

const Charts: NextPageWithLayout<Props> = ({ feed }) => {


  return (
    <CRow>

      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            Bar Chart
          </CCardHeader>
          <CCardBody>
          <PriceCurveChart employees={feed} />

            

          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>Line Chart</CCardHeader>
          <CCardBody>

          <DonutChart />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody>
          <Graph1 />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>Pie Chart</CCardHeader>
          <CCardBody>
          <AreaChart />

          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>Polar Area Chart</CCardHeader>
          <CCardBody>

          <Graph1 />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>Radar Chart</CCardHeader>
          <CCardBody>
          <Graph1 />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Charts.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Charts
