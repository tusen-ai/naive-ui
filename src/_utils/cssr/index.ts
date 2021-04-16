/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

function insideFormItem (status: string | null, style: CNode): CNode {
  if (status === null) return style
  return c([
    ({ props: { bPrefix } }) =>
      c(`${bPrefix || prefix}form-item`, [
        c(`${bPrefix || prefix}form-item-blank`, [
          c(`&${bPrefix || prefix}form-item-blank${modifierPrefix}${status}`, [
            style
          ])
        ])
      ])
  ])
}

function insideModal (style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) =>
      `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`,
    [style]
  )
}

function insidePopover (style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) =>
      `${bPrefix || prefix}popover:not(${bPrefix || prefix}tooltip)`,
    [style]
  )
}

function asModal (style: CProperties): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style)
}

export {
  c,
  cB,
  cE,
  cM,
  cNotM,
  insideFormItem,
  insideModal,
  insidePopover,
  asModal,
  prefix,
  namespace,
  find
}

export { createKey } from './create-key'
