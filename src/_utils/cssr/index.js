import { CSSRender } from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'

const prefix = '.n-'

const cssr = CSSRender()
const plugin = BEMPlugin({
  blockPrefix: prefix
})
cssr.use(plugin)
const { c, context } = cssr
context.theme = null
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
      after: ctx => { ctx.theme = null }
    }, [
      style
    ]),
    /** render themed styles */
    c({
      before: ctx => {
        ctx.theme = 'dark'
        ctx.pallete = themes['dark'] || fallbackPallete
      },
      after: ctx => { ctx.theme = null }
    }, [
      style
    ])
  ])
}

export { c, cTB, cB, cE, cM, cNotM, createThemedStyle }
