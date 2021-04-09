import CSSRender, { CNode, CProperties } from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CSSRender()
const plugin = BEMPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
cssr.use(plugin)
const { c, context, find } = cssr
context.theme = null
context.palette = null
const { cB, cE, cM, cNotM } = plugin

function insideFormItem (status: string | null, style: CNode): CNode {
  if (status === null) return style
  return c(`${prefix}form-item`, [
    c(`${prefix}form-item-blank`, [
      c(() => `&${prefix}form-item-blank${modifierPrefix}${status}`, [style])
    ])
  ])
}

function insideModal (style: CNode): CNode {
  return c(`${prefix}modal, ${prefix}drawer`, [style])
}

function insidePopover (style: CNode): CNode {
  return c(`${prefix}popover:not(${prefix}tooltip)`, [style])
}

function cRB (selector: string, ...rest: any[]): CNode {
  return (c as any)(`${prefix}${selector}`, ...rest)
}

function asModal (style: CProperties): CNode {
  return c(`&${prefix}modal`, style)
}

function withPrefix (selector: string): string {
  return `${prefix}${selector}`
}

export {
  c,
  cRB,
  cB,
  cE,
  cM,
  cNotM,
  insideFormItem,
  insideModal,
  insidePopover,
  withPrefix,
  asModal,
  prefix,
  namespace,
  find
}

export { createKey } from './create-key'
