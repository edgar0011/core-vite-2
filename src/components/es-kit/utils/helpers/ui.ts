export type TClassName = string | boolean | null | undefined
export const classNames = (...classes: TClassName[]): string =>
  classes
    .filter(
      (className: TClassName) =>
        typeof className === 'string' && className !== undefined && className !== null,
    )
    .filter(Boolean)
    .join(' ')

export type PropsCategoriesType = {
  dataProps: Record<string, unknown>
  restProps: Record<string, unknown>
}

export const parseProps = (props: Record<string, unknown>): PropsCategoriesType => {
  const dataProps: Record<string, unknown> = {}
  const restProps: Record<string, unknown> = {}

  Object.entries(props).forEach(([key, value]) => {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 4) === 'data') {
      dataProps[key] = value
    } else {
      restProps[key] = value
    }
  })
  return { dataProps, restProps }
}
