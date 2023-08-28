import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from './../store'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CContainer,
  CCard,
  CCardBody,
  CBadge,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { logoNegative } from '@/public/brand/logo-negative'
import { sygnet } from '@/public/brand/sygnet'

import { AppAside, AppFooter, AppHeader } from '@/components'
import {
  cilBookmark,
  cilInbox,
  cilPaperPlane,
  cilPencil,
  cilSpeedometer,
  cilStar,
  cilTrash,
} from '@coreui/icons'

export default function EmailAppLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const unfoldable = useTypedSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useTypedSelector((state) => state.sidebarShow)

  return (
    <>
      <CSidebar
        colorScheme="light"
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-none d-md-flex">
          <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        </CSidebarBrand>
        <CSidebarNav>
          <CNavItem component={Link} href="./compose">
            <CIcon icon={cilPencil} customClassName="nav-icon" />
            Compose
          </CNavItem>
          <CNavItem component={Link} href="./inbox">
            <CIcon icon={cilInbox} customClassName="nav-icon" />
            Inbox
            <CBadge color="danger-gradient" className="ms-auto">
              4
            </CBadge>
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilStar} customClassName="nav-icon" />
            Stared
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilPaperPlane} customClassName="nav-icon" />
            Sent
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilTrash} customClassName="nav-icon" />
            Trash
          </CNavItem>
          <CNavItem href="#">
            <CIcon icon={cilBookmark} customClassName="nav-icon" />
            Important
            <CBadge color="info-gradient" className="ms-auto">
              25
            </CBadge>
          </CNavItem>
          <CNavItem component={Link} href="/" className="mt-auto">
            <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
            Dashboard
          </CNavItem>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebar>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <CCard>
              <CCardBody>{children}</CCardBody>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
      <AppAside />
    </>
  )
}
