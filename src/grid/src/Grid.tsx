import {
  h,
  defineComponent,
  computed,
  CSSProperties,
  InjectionKey,
  PropType,
  provide,
  toRef,
  reactive,
  mergeProps,
  ref,
  VNode
} from 'vue'
import { useBreakpoint, useMemo } from 'vooks'
import { VResizeObserver, VResizeObserverOnResize } from 'vueuc'
import { pxfy, parseResponsivePropValue, beforeNextFrameOnce } from 'seemly'
import { getSlot, flatten } from '../../_utils'
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
  itemStyle: CSSProperties | string | undefined
  xGap: string | undefined
  yGap: string | undefined
  overflow: boolean
}

export const gridInjectionKey: InjectionKey<NGridInjection> = Symbol('n-grid')

export default defineComponent({
  name: 'Grid',
  inheritAttrs: false,
  props: gridProps,
  setup (props) {
    const numRegex = /^\d+$/
    const widthRef = ref<number | undefined>(undefined)
    const breakpointRef = useBreakpoint()
    const isResponsiveRef = useMemo(() => {
      if (!numRegex.test(props.cols.toString())) return true
      if (!numRegex.test(props.xGap.toString())) return true
      if (!numRegex.test(props.yGap.toString())) return true
      return false
    })
    const responsiveQueryRef = computed(() => {
      if (!isResponsiveRef.value) return undefined
      return props.responsive === 'self' ? widthRef.value : breakpointRef.value
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
    provide(
      gridInjectionKey,
      reactive({
        itemStyle: toRef(props, 'itemStyle'),
        xGap: responsiveXGapRef,
        yGap: responsiveYGapRef,
        overflow: overflowRef
      })
    )
    return {
      style: computed<CSSProperties>(() => {
        return {
          display: 'grid',
          gridTemplateColumns: `repeat(${responsiveColsRef.value}, minmax(0, 1fr))`,
          columnGap: pxfy(responsiveXGapRef.value),
          rowGap: pxfy(responsiveYGapRef.value)
        }
      }),
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
      const children = flatten(getSlot(this))

      const { collapsed, collapsedRows, responsiveCols, responsiveQuery } = this

      let suffixSpan = 0
      const maybeSuffixNode = children[children.length - 1]
      if (maybeSuffixNode?.props) {
        const suffixPropValue = maybeSuffixNode.props?.suffix
        if (suffixPropValue !== undefined && suffixPropValue !== false) {
          suffixSpan = maybeSuffixNode.props?.span ?? defaultSpan
          maybeSuffixNode.props.privateColStart =
            responsiveCols + 1 - suffixSpan
          maybeSuffixNode.props.privateShow = true
        }
      }

      let spanCounter = 0
      let done = false
      for (const child of children) {
        // @ts-expect-error
        if (child?.type?.__GRID_ITEM__ !== true) continue
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
            Math.min(
              Number(
                parseResponsivePropValue(
                  child.props?.span as string | number | undefined,
                  responsiveQuery
                ) ?? defaultSpan
              ) + childOffset,
              responsiveCols
            ) || 1

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
            class: 'n-grid',
            style: this.style
          },
          this.$attrs
        ),
        children
      )
    }
    return this.responsive === 'self' ? (
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
