/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CssRender, type CNode, type CProperties } from 'css-render'
import { plugin as BemPlugin } from '@css-render/plugin-bem'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
cssr.use(plugin)
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

function insideModal (style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) =>
      `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`,
    [style]
  )
}

function insidePopover (style: CNode): CNode {
  return c(({ props: { bPrefix } }) => `${bPrefix || prefix}popover`, [style])
}

function asModal (style: CProperties): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style)
}

// child block
const cCB: typeof cB = ((...args: any[]) => {
  return c('>', [(cB as any)(...args)])
}) as any

function createKey<P extends string, S extends string> (
  prefix: P,
  suffix: S
): S extends 'default' ? P : `${P}${Capitalize<S>}` {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prefix +
    (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, (startChar) =>
        startChar.toUpperCase()
      ))) as any
}

export {
  c,
  cB,
  cE,
  cM,
  cNotM,
  cCB,
  insideModal,
  insidePopover,
  asModal,
  prefix,
  namespace,
  find,
  createKey
}
