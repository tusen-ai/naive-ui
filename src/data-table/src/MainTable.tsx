/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h, ref, defineComponent, inject, computed, watchEffect } from 'vue'
import { formatLength } from '../../_utils'
import TableHeader from './TableParts/Header'
import TableBody from './TableParts/Body'
import type {
  MainTableBodyRef,
  MainTableHeaderRef,
  MainTableRef
} from './interface'
import { dataTableInjectionKey } from './interface'

export default defineComponent({
  setup () {
    const {
      mergedClsPrefixRef,
      rightFixedColumnsRef,
      leftFixedColumnsRef,
      bodyWidthRef,
      maxHeightRef,
      minHeightRef,
      flexHeightRef,
      syncScrollState
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!

    const headerInstRef = ref<MainTableHeaderRef | null>(null)
    const bodyInstRef = ref<MainTableBodyRef | null>(null)
    const selfElRef = ref<HTMLElement | null>(null)

    const fixedStateInitializedRef = ref(
      !(leftFixedColumnsRef.value.length || rightFixedColumnsRef.value.length)
    )

    const bodyStyleRef = computed(() => {
      return {
        maxHeight: formatLength(maxHeightRef.value),
        minHeight: formatLength(minHeightRef.value)
      }
    })
    function handleBodyResize (entry: ResizeObserverEntry): void {
      bodyWidthRef.value = entry.contentRect.width
      syncScrollState()
      if (!fixedStateInitializedRef.value) {
        fixedStateInitializedRef.value = true
      }
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
    const exposedMethods: MainTableRef = {
      getBodyElement,
      getHeaderElement,
      scrollTo (arg0: any, arg1?: any) {
        bodyInstRef.value?.scrollTo(arg0, arg1)
      }
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
      maxHeight: maxHeightRef,
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      headerInstRef,
      bodyInstRef,
      bodyStyle: bodyStyleRef,
      flexHeight: flexHeightRef,
      handleBodyResize,
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, maxHeight, flexHeight } = this
    const headerInBody = maxHeight === undefined && !flexHeight
    return (
      <div class={`${mergedClsPrefix}-data-table-base-table`} ref="selfElRef">
        {headerInBody ? null : <TableHeader ref="headerInstRef" />}
        <TableBody
          ref="bodyInstRef"
          bodyStyle={this.bodyStyle}
          showHeader={headerInBody}
          flexHeight={flexHeight}
          onResize={this.handleBodyResize}
        />
      </div>
    )
  }
})
