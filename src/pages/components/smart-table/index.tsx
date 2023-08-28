import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'

import { DashboardLayout, DocsExample } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

import SmartTableBasixExample from './SmartTableBasixExample'
import SmartTableDownloadableExample from './SmartTableDownloadableExample'
import SmartTableSelectableExample from './SmartTableSelectableExample'

const SmartTable: NextPageWithLayout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI Smart Table</strong> <small>React Table Component</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/smart-table/">
              <SmartTableBasixExample />
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI Smart Table</strong> <small>Table with selectable rows</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/smart-table/">
              <SmartTableSelectableExample />
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CoreUI Smart Table</strong> <small>Table with selectable rows</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/smart-table/">
              <SmartTableDownloadableExample />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

SmartTable.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default SmartTable
