import { CCard, CCardBody, CCardHeader, CCol, CRow, CTimePicker } from '@coreui/react-pro'

import { DashboardLayout, DocsExample } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

const TimePicker: NextPageWithLayout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI React Time Picker</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/time-picker/#example">
              <CRow>
                <CCol lg={4}>
                  <CTimePicker locale="en-US" />
                </CCol>
                <CCol lg={4}>
                  <CTimePicker locale="en-US" time="02:17:35 PM" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI React Time Picker</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Set heights using <code>size</code> property like <code>size=&#34;lg&#34;</code> and{' '}
              <code>size=&#34;sm&#34;</code>.
            </p>
            <DocsExample href="forms/time-picker/#sizing">
              <CRow className="row mb-4">
                <CCol lg={4}>
                  <CTimePicker locale="en-US" size="lg" />
                </CCol>
              </CRow>
              <CRow className="row">
                <CCol lg={3}>
                  <CTimePicker locale="en-US" size="sm" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI React Time Picker</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>disabled</code> boolean attribute on an input to give it a grayed out
              appearance and remove pointer events.
            </p>
            <DocsExample href="forms/time-picker/#disabled">
              <CRow>
                <CCol lg={4}>
                  <CTimePicker disabled locale="en-US" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI React Time Picker</strong> <small>Readonly</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>inputReadOnly</code> boolean attribute to prevent modification of the
              input&#39;s value.
            </p>
            <DocsExample href="forms/time-picker/#readonly">
              <CRow>
                <CCol lg={4}>
                  <CTimePicker inputReadOnly locale="en-US" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

TimePicker.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default TimePicker
