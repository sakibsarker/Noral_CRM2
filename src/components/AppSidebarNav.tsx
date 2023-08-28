import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import { CBadge } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { Badge, NavItem } from '../_nav'

interface AppSidebarNavProps {
  items: NavItem[]
}

export default function AppSidebarNav({ items }: AppSidebarNavProps) {
  const location = usePathname()
  const navLink = (
    name: string | JSX.Element,
    icon: string | ReactNode,
    badge?: Badge,
  ) => {
    return (
      <>
        {icon && typeof icon === 'string' ? (
          <CIcon icon={icon} customClassName="nav-icon" />
        ) : (
          icon
        )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: NavItem, index: number) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.href &&
          !rest.items && {
            active: location === rest.href,
            component: Link
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item: NavItem, index: number) => {
    const { component, name, icon, href, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        {...href && {visible: location && location.startsWith(href)}}
        {...rest}
      >
        {item.items?.map((item: NavItem, index: number) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item: NavItem, index: number) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
    </React.Fragment>
  )
}
