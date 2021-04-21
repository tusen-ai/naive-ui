import { h, defineComponent, inject, computed, Ref } from 'vue'
import { NDropdown } from '../../../dropdown'
import { NLocale } from '../../../locales'
import { NBaseIcon } from '../../../_internal'
import { ChevronDownIcon } from '../../../_internal/icons'
import type { RowData, TmNode } from '../interface'
import { dataTableInjectionKey } from '../interface'

export type DataTableSelectionOption = 'all' | 'none'

const allKey = '_n_all__'
const noneKey = '_n_none__'

function createSelectHandler (
  options:
  | Array<
  | DataTableSelectionOption
  | {
    label: string
    key: string | number
    onSelect: (pageData: RowData[]) => void
  }
  >
  | undefined,
  paginatedDataRef: Ref<TmNode[]>,
  doCheckAll: (checkWholeTable?: boolean) => void,
  doUncheckAll: (checkWholeTable?: boolean) => void
): (key: string | number) => void {
  if (!options) return () => {}
  return (key: string | number) => {
    for (const option of options) {
      switch (key) {
        case allKey:
          doCheckAll(true)
          return
        case '_n-none__':
          doUncheckAll(true)
          return
        default:
          if (typeof option === 'object' && option.key === key) {
            option.onSelect(
              paginatedDataRef.value.map((rowTmNode) => rowTmNode.rawNode)
            )
            return
          }
      }
    }
  }
}

function createDropdownOptions (
  options:
  | Array<
  | DataTableSelectionOption
  | { label: string, key: string | number, onSelect: () => void }
  >
  | undefined,
  localeRef: NLocale['DataTable']
): Array<{ label: string, key: string | number }> {
  if (!options) return []
  return options.map((option) => {
    switch (option) {
      case 'all':
        return {
          label: localeRef.checkTableAll,
          key: allKey
        }
      case 'none':
        return {
          label: localeRef.uncheckTableAll,
          key: noneKey
        }
      default:
        return option
    }
  })
}

export default defineComponent({
  name: 'DataTableSelectionMenu',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup () {
    const {
      localeRef,
      checkOptionsRef,
      paginatedDataRef,
      doCheckAll,
      doUncheckAll
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    return {
      handleSelect: computed(() =>
        createSelectHandler(
          checkOptionsRef.value,
          paginatedDataRef,
          doCheckAll,
          doUncheckAll
        )
      ),
      options: computed(() =>
        createDropdownOptions(checkOptionsRef.value, localeRef.value)
      )
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <NDropdown options={this.options} onSelect={this.handleSelect}>
        {{
          default: () => (
            <NBaseIcon
              clsPrefix={clsPrefix}
              class={`${clsPrefix}-data-table-check-extra`}
            >
              {{
                default: () => <ChevronDownIcon />
              }}
            </NBaseIcon>
          )
        }}
      </NDropdown>
    )
  }
})
