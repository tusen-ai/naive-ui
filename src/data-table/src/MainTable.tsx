import {
  h,
  ref,
  defineComponent,
  inject,
  computed,
  renderSlot,
  provide,
  reactive
} from 'vue'
import { VResizeObserver } from 'vueuc'
import 'resize-observer-polyfill'
import { formatLength } from '../../_utils'
import TableHeader from './TableParts/Header'
import TableBody from './TableParts/Body'
import {
  ColumnKey,
  DataTableInjection,
  MainTableBodyRef,
  MainTableHeaderRef,
  MainTableInjection,
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
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection

    let tableWidth: number = 0
    const bodyMaxHeightRef = ref<number | undefined>(undefined)
    const bodyMinHeightRef = ref<number | undefined>(undefined)
    const leftActiveFixedColKeyRef = ref<ColumnKey | null>(null)
    const rightActiveFixedColKeyRef = ref<ColumnKey | null>(null)
    const headerInstRef = ref<MainTableHeaderRef | null>(null)
    const bodyInstRef = ref<MainTableBodyRef | null>(null)

    const { rightFixedColumns, leftFixedColumns } = NDataTable
    const fixedStateInitializedRef = ref(
      !(leftFixedColumns.length || rightFixedColumns.length)
    )

    const bodyStyleRef = computed(() => {
      return {
        maxHeight: formatLength(bodyMaxHeightRef.value),
        minHeight: formatLength(bodyMinHeightRef.value)
      }
    })
    function handleHeaderResize (entry: ResizeObserverEntry): void {
      setTableWidth(entry.contentRect.width)
      deriveBodyMinMaxHeight(entry.contentRect.height)
      deriveActiveLeftFixedColumn(entry.target as HTMLElement)
      deriveActiveRightFixedColumn(entry.target as HTMLElement)
      if (!fixedStateInitializedRef.value) {
        fixedStateInitializedRef.value = true
      }
    }
    function handleHeaderScroll (e: Event): void {
      deriveActiveRightFixedColumn(e.target as HTMLElement)
      deriveActiveLeftFixedColumn(e.target as HTMLElement)
      NDataTable.handleTableHeaderScroll(e)
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
      tableWidth = width
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
    function deriveActiveRightFixedColumn (target: HTMLElement): void {
      // target is header element
      const { rightFixedColumns } = NDataTable
      const { scrollLeft } = target
      const scrollWidth = target.scrollWidth
      let rightWidth = 0
      let rightActiveFixedColKey = null
      const { fixedColumnRightMap } = NDataTable
      for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
        const key = rightFixedColumns[i].key
        if (
          scrollLeft +
            (fixedColumnRightMap[key] || 0) +
            tableWidth -
            rightWidth <
          scrollWidth
        ) {
          rightActiveFixedColKey = key
          rightWidth += rightFixedColumns[i].width || 0
        } else {
          break
        }
      }
      rightActiveFixedColKeyRef.value = rightActiveFixedColKey
    }
    function deriveActiveLeftFixedColumn (target: HTMLElement): void {
      // target is header element
      const { leftFixedColumns } = NDataTable
      const scrollLeft = target.scrollLeft
      let leftWidth = 0
      const { fixedColumnLeftMap } = NDataTable
      let leftActiveFixedColKey = null
      for (let i = 0; i < leftFixedColumns.length; ++i) {
        const key = leftFixedColumns[i].key
        if (scrollLeft > (fixedColumnLeftMap[key] || 0) - leftWidth) {
          leftActiveFixedColKey = key
          leftWidth += leftFixedColumns[i].width || 0
        } else {
          break
        }
      }
      leftActiveFixedColKeyRef.value = leftActiveFixedColKey
    }
    const exposedMethods: MainTableRef = {
      getBodyElement,
      getHeaderElement
    }
    provide<MainTableInjection>(
      'NMainTable',
      reactive({
        leftActiveFixedColKey: leftActiveFixedColKeyRef,
        rightActiveFixedColKey: rightActiveFixedColKeyRef
      })
    )
    return {
      headerInstRef,
      bodyInstRef,
      bodyStyle: bodyStyleRef,
      fixedStateInitialized: fixedStateInitializedRef,
      handleHeaderScroll,
      handleHeaderResize,
      ...exposedMethods
    }
  },
  render () {
    return (
      <div
        class={[
          'n-data-table-base-table',
          {
            'n-data-table-base-table--transition-disabled': !this
              .fixedStateInitialized
          }
        ]}
      >
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
