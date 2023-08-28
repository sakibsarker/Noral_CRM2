import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { flagSet } from '@coreui/icons'

import { DashboardLayout } from '@/components'

import type { NextPageWithLayout } from '@/pages/_app'

import { getIconsView } from '@/components/IconsView'

const CoreUIFlagsIcons: NextPageWithLayout = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>Flag Icons</CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(flagSet)}</CRow>
      </CCardBody>
    </CCard>
  )
}

CoreUIFlagsIcons.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CoreUIFlagsIcons
