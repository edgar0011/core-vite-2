import { cva, type VariantProps } from 'class-variance-authority'

/**
 * CVA configuration for TableRow styling
 */
export const tableRowVariants = cva('transition-colors', {
  variants: {
    selected: {
      true: '',
      false: '',
    },
    clickable: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    clickable: false,
  },
})

export type TableRowVariantProps = VariantProps<typeof tableRowVariants>
