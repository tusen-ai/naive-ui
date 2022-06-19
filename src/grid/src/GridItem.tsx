import {
  h,
  defineComponent,
  inject,
  getCurrentInstance,
  PropType,
  CSSProperties,
  onMounted
} from 'vue'
import { pxfy } from 'seemly'
import { keysOf, isBrowser } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { gridInjectionKey } from './config'

export const defaultSpan = 1

interface GridItemVNodeProps {
  privateOffset?: number
  privateSpan?: number
  privateColStart?: number
  privateShow?: boolean
}

export const gridItemProps = {
  span: {
    type: [Number, String] as PropType<string | number>,
    default: defaultSpan
  },
  offset: {
    type: [Number, String] as PropType<string | number>,
    default: 0
  },
  suffix: Boolean,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
} as const

export const gridItemPropKeys = keysOf(gridItemProps)

export type GridItemProps = ExtractPublicPropTypes<typeof gridItemProps>

const SSR_ATTR_NAME = '__ssr_key'

export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup () {
    const {
      xGapRef,
      itemStyleRef,
      overflowRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(gridInjectionKey)!
    const self = getCurrentInstance()

    const deriveStyle = (): CSSProperties => {
      // Here is quite a hack, I hope there is a better way to solve it
      const {
        privateSpan = defaultSpan,
        privateShow = true,
        privateColStart = undefined,
        privateOffset = 0
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      } = self!.vnode.props as GridItemVNodeProps
      const { value: xGap } = xGapRef
      const mergedXGap = pxfy(xGap || 0)
      return {
        display: !privateShow ? 'none' : '',
        gridColumn: `${
          privateColStart ?? `span ${privateSpan}`
        } / span ${privateSpan}`,
        marginLeft: privateOffset
          ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})`
          : ''
      }
    }

    const createSSRKey = (): string => {
      return JSON.stringify(deriveStyle())
    }

    onMounted(() => {
      const instance = self?.proxy
      if (!instance) return

      // for SSR, fix bug https://github.com/TuSimple/naive-ui/issues/2462
      const el: HTMLElement = instance.$el
      const ssrKey = el.getAttribute(SSR_ATTR_NAME)
      if (ssrKey) {
        if (ssrKey !== createSSRKey()) {
          instance.$forceUpdate()
        }
        el.removeAttribute(SSR_ATTR_NAME)
      }
    })

    return {
      isSSR: !isBrowser,
      overflow: overflowRef,
      itemStyle: itemStyleRef,
      deriveStyle,
      createSSRKey
    }
  },
  render () {
    const { isSSR, overflow, itemStyle, $slots, deriveStyle, createSSRKey } =
      this

    const ssrKey = isSSR ? createSSRKey() : undefined

    return (
      <div
        {...{ [SSR_ATTR_NAME]: ssrKey }}
        style={[itemStyle as any, deriveStyle()]}
      >
        {$slots.default?.({ overflow })}
      </div>
    )
  }
})
