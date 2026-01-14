import { cva, type VariantProps } from 'class-variance-authority'

/**
 * CVA configuration for TableCell styling
 */
export const tableCellVariants = cva('', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {},
})

export type TableCellVariantProps = VariantProps<typeof tableCellVariants>
