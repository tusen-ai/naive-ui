import { CSSRender } from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'

const cssr = CSSRender()
const plugin = BEMPlugin({
  blockPrefix: '.n-'
})
cssr.use(plugin)
const { c } = cssr
const { cB, cE, cM, cNotM } = plugin

export { c, cB, cE, cM, cNotM }
