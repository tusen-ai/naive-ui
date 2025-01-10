import type { ExtractPublicPropTypes } from '../../_utils'
import type { ScrollbarProps } from '../../scrollbar/src/Scrollbar'
import { throttle } from 'lodash'
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  type PropType,
  ref
} from 'vue'
import { NxScrollbar, type ScrollbarInst } from '../../_internal'

export const infiniteScrollProps = {
  distance: {
    type: Number,
    default: 0
  },
  reverse: Boolean,
  onLoad: Function as PropType<() => Promise<void> | void>,
  scrollbarProps: Object as PropType<ScrollbarProps>
} as const

export type InfiniteScrollProps = ExtractPublicPropTypes<
  typeof infiniteScrollProps
>

export default defineComponent({
  name: 'InfiniteScroll',
  props: infiniteScrollProps,
  setup(props) {
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)

    let loading = false
    async function handleLoad() {
      loading = true
      try {
        await props.onLoad?.()
      }
      finally {
        loading = false
      }
    }
    const handleScroll = throttle(_handleScroll, 200, { trailing: true })
    function _handleScroll(): void {
      triggerLoad()
    }
    async function triggerLoad() {
      if (loading)
        return
      const { value: scrollbarInst } = scrollbarInstRef
      const containerRef = scrollbarInst?.containerRef
      if (!containerRef)
        return
      const {
        scrollHeight: scrollHeightBefore,
        clientHeight,
        scrollTop
      } = containerRef
      const { reverse, distance } = props
      if (reverse) {
        if (scrollTop <= distance) {
          await handleLoad()
          nextTick(() => {
            const scrollHeightAfter = containerRef.scrollHeight
            const top = scrollHeightAfter - scrollHeightBefore
            scrollbarInstRef.value?.scrollTo({ top })
          })
        }
      }
      else if (scrollTop + clientHeight + distance >= scrollHeightBefore) {
        handleLoad()
      }
    }

    onMounted(() => {
      triggerLoad()
    })

    return {
      scrollbarInstRef,
      handleScroll
    }
  },
  render() {
    return (
      <NxScrollbar
        {...this.scrollbarProps}
        ref="scrollbarInstRef"
        onScroll={this.handleScroll}
      >
        {this.$slots.default}
      </NxScrollbar>
    )
  }
})
