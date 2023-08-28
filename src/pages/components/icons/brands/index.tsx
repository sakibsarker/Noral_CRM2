import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { brandSet } from '@coreui/icons'

import { DashboardLayout } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

import { getIconsView } from '@/components/IconsView'

const CoreUIBrandsIcons: NextPageWithLayout = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>Brand Icons</CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(brandSet)}</CRow>
      </CCardBody>
    </CCard>
  )
}

CoreUIBrandsIcons.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CoreUIBrandsIcons
