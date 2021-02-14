export interface Item {
  type?: 'group'
  path?: string
  title?: string
  disabled?: boolean
  children?: Item[]
  key?: string
  [key: string]: unknown

  /** @deprecated */
  name?: string
  /** @deprecated */
  titleExtra?: string
  /** @deprecated */
  group?: boolean
  /** @deprecated */
  extra?: string
  /** @deprecated */
  childItems?: Item[]
}
