import CSSRender from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'
import { fallbackTheme } from '../../_mixins/themeable'
import { warn } from '../naive'

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
context.pallete = null
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

function cTB (selector, ...rest) {
  return cB(selector, [
    c(({ props }) => {
      const theme = props.$theme
      if (__DEV__ && !theme) {
        warn(
          'utils/cssr',
          'No theme when rendering styles, this could be a bug of naive-ui.'
        )
      }
      return theme === fallbackTheme ? '' : `&.${namespace}-${theme}-theme`
    }, ...rest)
  ])
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

export {
  c,
  cTB,
  cRB,
  cB,
  cE,
  cM,
  cNotM,
  insideFormItem,
  insideModal,
  prefix,
  namespace,
  createKey,
  find
}
