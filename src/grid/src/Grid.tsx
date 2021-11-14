import {
  h,
  defineComponent,
  computed,
  CSSProperties,
  InjectionKey,
  PropType,
  provide,
  toRef,
  mergeProps,
  ref,
  VNode,
  Ref,
  cloneVNode
} from 'vue'
import { useBreakpoints, useMemo } from 'vooks'
import { VResizeObserver, VResizeObserverOnResize } from 'vueuc'
import { pxfy, parseResponsivePropValue, beforeNextFrameOnce } from 'seemly'
import { defaultBreakpoints } from '../../config-provider/src/config'
import { useConfig } from '../../_mixins'
import { getSlot, flatten, ExtractPublicPropTypes } from '../../_utils'
import { defaultSpan } from './GridItem'

const defaultCols = 24

const gridProps = {
  responsive: {
    type: [String, Boolean] as PropType<'self' | 'screen'>,
    default: 'self'
  },
  cols: {
    type: [Number, String] as PropType<number | string>,
    default: defaultCols
  },
  itemResponsive: Boolean,
  collapsed: Boolean,
  // may create grid rows < collapsedRows since a item may take all the row
  collapsedRows: {
    type: Number,
    default: 1
  },
  itemStyle: [Object, String] as PropType<CSSProperties | string>,
  xGap: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  yGap: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  }
} as const

export interface NGridInjection {
  itemStyleRef: Ref<CSSProperties | string | undefined>
  xGapRef: Ref<string | undefined>
  overflowRef: Ref<boolean>
}

export const gridInjectionKey: InjectionKey<NGridInjection> = Symbol('grid')

export type GridProps = ExtractPublicPropTypes<typeof gridProps>

export default defineComponent({
  name: 'Grid',
  inheritAttrs: false,
  props: gridProps,
  setup (props) {
    const { mergedClsPrefixRef, NConfigProvider } = useConfig(props)
    const numRegex = /^\d+$/
    const widthRef = ref<number | undefined>(undefined)
    const breakpointsRef = useBreakpoints(
      NConfigProvider?.mergedBreakpointsRef.value || defaultBreakpoints
    )
    const isResponsiveRef = useMemo(() => {
      if (props.itemResponsive) return true
      if (!numRegex.test(props.cols.toString())) return true
      if (!numRegex.test(props.xGap.toString())) return true
      if (!numRegex.test(props.yGap.toString())) return true
      return false
    })
    const responsiveQueryRef = computed(() => {
      if (!isResponsiveRef.value) return undefined
      return props.responsive === 'self' ? widthRef.value : breakpointsRef.value
    })
    const responsiveColsRef = useMemo(() => {
      return (
        Number(
          parseResponsivePropValue(
            props.cols.toString(),
            responsiveQueryRef.value
          )
        ) ?? defaultCols
      )
    })
    const responsiveXGapRef = useMemo(() =>
      parseResponsivePropValue(props.xGap.toString(), responsiveQueryRef.value)
    )
    const responsiveYGapRef = useMemo(() =>
      parseResponsivePropValue(props.yGap.toString(), responsiveQueryRef.value)
    )
    const handleResize: VResizeObserverOnResize = (entry) => {
      widthRef.value = entry.contentRect.width
    }
    const handleResizeRaf: VResizeObserverOnResize = (entry) => {
      beforeNextFrameOnce(handleResize, entry)
    }
    const overflowRef = ref(false)
    const handleResizeRef = computed<VResizeObserverOnResize | undefined>(
      () => {
        if (props.responsive === 'self') {
          return handleResizeRaf
        }
        return undefined
      }
    )
    provide(gridInjectionKey, {
      itemStyleRef: toRef(props, 'itemStyle'),
      xGapRef: responsiveXGapRef,
      overflowRef
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed<CSSProperties>(() => {
        return {
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${responsiveColsRef.value}, minmax(0, 1fr))`,
          columnGap: pxfy(responsiveXGapRef.value),
          rowGap: pxfy(responsiveYGapRef.value)
        }
      }),
      isResponsive: isResponsiveRef,
      responsiveQuery: responsiveQueryRef,
      responsiveCols: responsiveColsRef,
      handleResize: handleResizeRef,
      overflow: overflowRef
    }
  },
  render () {
    const renderContent = (): VNode => {
      this.overflow = false

      // render will be called twice when mounted, I can't figure out why
      // 2 jobs will be pushed into job queues with same id, and then be flushed
      const rawChildren = flatten(getSlot(this))

      const childrenAndRawSpan: Array<{
        child: VNode
        rawChildSpan: number
      }> = []

      const { collapsed, collapsedRows, responsiveCols, responsiveQuery } = this

      rawChildren.forEach((child) => {
        if ((child?.type as any)?.__GRID_ITEM__ !== true) return
        const clonedChild = cloneVNode(child)

        const rawChildSpan = Number(
          parseResponsivePropValue(
            clonedChild.props?.span as string | number | undefined,
            responsiveQuery
          ) ?? defaultSpan
        )

        if (rawChildSpan === 0) return

        childrenAndRawSpan.push({
          child: clonedChild,
          rawChildSpan
        })
      })

      let suffixSpan = 0
      const maybeSuffixNode =
        childrenAndRawSpan[childrenAndRawSpan.length - 1]?.child
      if (maybeSuffixNode?.props) {
        const suffixPropValue = maybeSuffixNode.props?.suffix
        if (suffixPropValue !== undefined && suffixPropValue !== false) {
          suffixSpan = maybeSuffixNode.props?.span ?? defaultSpan
          maybeSuffixNode.props.privateSpan = suffixSpan
          maybeSuffixNode.props.privateColStart =
            responsiveCols + 1 - suffixSpan
          maybeSuffixNode.props.privateShow = true
        }
      }

      let spanCounter = 0
      let done = false
      for (const { child, rawChildSpan } of childrenAndRawSpan) {
        if (done) {
          this.overflow = true
        }

        if (!done) {
          const childOffset = Number(
            parseResponsivePropValue(
              child.props?.offset as string | number | undefined,
              responsiveQuery
            ) ?? 0
          )

          const childSpan =
            Math.min(rawChildSpan + childOffset, responsiveCols) || 1

          if (!child.props) {
            child.props = {
              privateSpan: childSpan,
              privateOffset: childOffset
            }
          } else {
            child.props.privateSpan = childSpan
            child.props.privateOffset = childOffset
          }
          if (collapsed) {
            const remainder = spanCounter % responsiveCols
            if (childSpan + remainder > responsiveCols) {
              spanCounter += responsiveCols - remainder
            }
            if (
              childSpan + spanCounter + suffixSpan >
              collapsedRows * responsiveCols
            ) {
              done = true
            } else {
              spanCounter += childSpan
            }
          }
        }
        if (done) {
          if (child.props) {
            if (child.props.privateShow !== true) {
              child.props.privateShow = false
            }
          } else {
            child.props = {
              privateShow: false
            }
          }
        }
      }

      return h(
        'div',
        mergeProps(
          {
            class: `${this.mergedClsPrefix}-grid`,
            style: this.style
          },
          this.$attrs
        ),
        childrenAndRawSpan.map(({ child }) => child)
      )
    }
    return this.isResponsive && this.responsive === 'self' ? (
      <VResizeObserver onResize={this.handleResize}>
        {{
          default: renderContent
        }}
      </VResizeObserver>
    ) : (
      renderContent()
    )
  }
})
