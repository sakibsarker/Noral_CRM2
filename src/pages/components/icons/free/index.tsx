import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { freeSet } from '@coreui/icons'

import { DashboardLayout } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

import { getIconsView } from '@/components/IconsView'

const CoreUIFreeIcons: NextPageWithLayout = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>Free Icons</CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(freeSet)}</CRow>
      </CCardBody>
    </CCard>
  )
}

CoreUIFreeIcons.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CoreUIFreeIcons
