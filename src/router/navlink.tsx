import { NavLink as RRNavLink, type NavLinkProps } from 'react-router'

export const NavLink = (props: NavLinkProps) => (
  <RRNavLink
    {...props}
    className={({ isActive }) => (isActive ? 'text-blue-200' : 'text-blue-400')}
  />
)
