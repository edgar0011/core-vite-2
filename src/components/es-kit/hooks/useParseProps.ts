import { parseProps } from '../utils/helpers/ui'

/**
 * Custom hook to parse properties using the `parseProps` utility function.
 * @param {Record<string, unknown>} props - The properties to be parsed.
 * @returns {ReturnType<typeof parseProps>} The parsed properties categorized by the `parseProps` function.
 */
export const useParseProps = (props: Record<string, unknown>): ReturnType<typeof parseProps> => {
  return parseProps(props)
}
