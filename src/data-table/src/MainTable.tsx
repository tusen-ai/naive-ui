/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  ref,
  defineComponent,
  inject,
  computed,
  renderSlot,
  watchEffect
} from 'vue'
import { VResizeObserver } from 'vueuc'
import { formatLength } from '../../_utils'
import TableHeader from './TableParts/Header'
import TableBody from './TableParts/Body'
import {
  dataTableInjectionKey,
  MainTableBodyRef,
  MainTableHeaderRef,
  MainTableRef
} from './interface'

export default defineComponent({
  props: {
    maxHeight: Number,
    minHeight: Number,
    bordered: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const {
      mergedClsPrefixRef,
      rightFixedColumnsRef,
      leftFixedColumnsRef,
      tableWidthRef,
      syncScrollState,
      handleTableHeaderScroll
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!

    const bodyMaxHeightRef = ref<number | undefined>(undefined)
    const bodyMinHeightRef = ref<number | undefined>(undefined)

    const headerInstRef = ref<MainTableHeaderRef | null>(null)
    const bodyInstRef = ref<MainTableBodyRef | null>(null)
    const selfElRef = ref<HTMLElement | null>(null)

    const fixedStateInitializedRef = ref(
      !(leftFixedColumnsRef.value.length || rightFixedColumnsRef.value.length)
    )

    const bodyStyleRef = computed(() => {
      return {
        maxHeight: formatLength(props.maxHeight),
        minHeight: formatLength(props.minHeight)
        // the following mode will cause dup renders
        // need to expose a new props to enable it
        // maxHeight: formatLength(bodyMaxHeightRef.value ?? props.maxHeight),
        // minHeight: formatLength(bodyMinHeightRef.value ?? props.minHeight)
      }
    })
    function handleHeaderResize (entry: ResizeObserverEntry): void {
      setTableWidth(entry.contentRect.width)
      deriveBodyMinMaxHeight(entry.contentRect.height)
      syncScrollState()
      if (!fixedStateInitializedRef.value) {
        fixedStateInitializedRef.value = true
      }
    }
    function handleHeaderScroll (): void {
      handleTableHeaderScroll()
    }
    function getHeaderElement (): HTMLElement | null {
      const { value } = headerInstRef
      if (value) {
        return value.$el
      }
      return null
    }
    function getBodyElement (): HTMLElement | null {
      const { value } = bodyInstRef
      if (value) {
        return value.getScrollContainer()
      }
      return null
    }
    function setTableWidth (width: number): void {
      tableWidthRef.value = width
    }
    function deriveBodyMinMaxHeight (headerHeight: number): void {
      const { bordered, maxHeight, minHeight } = props
      if (maxHeight !== undefined) {
        bodyMaxHeightRef.value = maxHeight + (bordered ? -2 : 0) - headerHeight
      }
      if (minHeight !== undefined) {
        bodyMinHeightRef.value = minHeight + (bordered ? -2 : 0) - headerHeight
      }
    }
    const exposedMethods: MainTableRef = {
      getBodyElement,
      getHeaderElement
    }
    watchEffect(() => {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      const transitionDisabledClass = `${mergedClsPrefixRef.value}-data-table-base-table--transition-disabled`
      if (fixedStateInitializedRef.value) {
        setTimeout(() => {
          selfEl.classList.remove(transitionDisabledClass)
        }, 0)
      } else {
        selfEl.classList.add(transitionDisabledClass)
      }
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      headerInstRef,
      bodyInstRef,
      bodyStyle: bodyStyleRef,
      handleHeaderScroll,
      handleHeaderResize,
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div class={`${mergedClsPrefix}-data-table-base-table`} ref="selfElRef">
        <VResizeObserver onResize={this.handleHeaderResize}>
          {{
            default: () => (
              <TableHeader
                ref="headerInstRef"
                onScroll={this.handleHeaderScroll}
              />
            )
          }}
        </VResizeObserver>
        <TableBody ref="bodyInstRef" style={this.bodyStyle} />
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
