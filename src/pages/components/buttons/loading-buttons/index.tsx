import { CLoadingButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'

import { DashboardLayout, DocsExample } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

const LoadingButtons: NextPageWithLayout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Loading Button</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              CoreUI includes a buttons with built-in loading indicators. Indicate the loading state
              of the button bridging the gap between action and feedback..
            </p>
            <DocsExample href="components/loading-button">
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton color={color} timeout={2000}>
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton color={color} variant="outline" timeout={2000}>
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton color={color} variant="ghost" timeout={2000}>
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
            </DocsExample>
            <h6>Loading Buttons with grow spinner</h6>
            <DocsExample href="components/loading-button#grow">
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton color={color} spinnerType="grow" timeout={2000}>
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton
                        color={color}
                        spinnerType="grow"
                        variant="outline"
                        timeout={2000}
                      >
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
              <CRow className="py-4 text-center">
                {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(
                  (color, index) => (
                    <CCol md={2} key={index}>
                      <CLoadingButton
                        color={color}
                        spinnerType="grow"
                        variant="ghost"
                        timeout={2000}
                      >
                        Submit
                      </CLoadingButton>
                    </CCol>
                  ),
                )}
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

LoadingButtons.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default LoadingButtons
