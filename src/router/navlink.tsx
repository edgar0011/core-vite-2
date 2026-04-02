import { NavLink as RRNavLink, type NavLinkProps } from 'react-router'

import { cn } from '~/lib/utils'

export const NavLink = (props: NavLinkProps) => (
  <RRNavLink
    {...props}
    end
    className={({ isActive }) =>
      cn(
        'rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-all',
        isActive
          ? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
          : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]',
      )
    }
  />
)
