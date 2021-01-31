export interface Item {
  type?: 'group'
  path?: string
  title?: string
  disabled?: boolean
  childItems?: Item[]
  [key: string]: unknown

  /** @deprecated */
  name?: string
  /** @deprecated */
  titleExtra?: string
  /** @deprecated */
  group?: boolean
  /** @deprecated */
  extra?: string
}
