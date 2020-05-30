import { CSSRender } from 'css-render'
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
const { c, context } = cssr
context.theme = null
context.pallete = null
const { cB, cE, cM, cNotM } = plugin

const cTB = (selector, ...rest) => {
  return cB(selector, [
    ({ context: ctx }) => {
      if (ctx.theme) {
        return c('&' + prefix + ctx.theme + '-theme', ...rest)
      }
      return c('&', ...rest)
    }
  ])
}

function createThemedStyle (style, themes) {
  const fallbackPallete = themes.fallback
  return c([
    /** render a fallback style */
    c({
      before: ctx => {
        ctx.theme = null
        ctx.pallete = fallbackPallete
      },
      after: ctx => {
        ctx.theme = null
        ctx.pallete = null
      }
    }, [
      style
    ]),
    /** render themed styles */
    c({
      before: ctx => {
        ctx.theme = 'dark'
        ctx.pallete = themes['dark'] || fallbackPallete
      },
      after: ctx => {
        ctx.theme = null
        ctx.pallete = null
      }
    }, [
      style
    ])
  ])
}

function createStyleAsFormItem (style) {
  return c(`${prefix}form-item`, [
    c(`${prefix}form-item-blank`, [
      c(({ props }) => `&${prefix}form-item-blank${modifierPrefix}${props.status}`, [
        style
      ])
    ])
  ])
}

export { c, cTB, cB, cE, cM, cNotM, createThemedStyle, createStyleAsFormItem, namespace }
