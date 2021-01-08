import CSSRender from 'css-render'
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

function insideFormItem (status, style) {
  if (status === null) return style
  return c(`${prefix}form-item`, [
    c(`${prefix}form-item-blank`, [
      c(() => `&${prefix}form-item-blank${modifierPrefix}${status}`, [style])
    ])
  ])
}

function insideModal (style) {
  return c(`${prefix}modal, ${prefix}drawer`, [style])
}

function createKey (keyPrefix, ...suffixs) {
  return (
    keyPrefix +
    suffixs
      .map((suffix) => {
        if (suffix === 'default') return ''
        return suffix.replace(/^[a-z]/, (startChar) => startChar.toUpperCase())
      })
      .join('')
  )
}

function cRB (selector, ...rest) {
  return c(`${prefix}${selector}`, ...rest)
}

function withPrefix (selector) {
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
  withPrefix,
  prefix,
  namespace,
  createKey,
  find
}
