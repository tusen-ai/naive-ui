import { h, defineComponent, inject, computed } from 'vue'
import { NDropdown } from '../../../dropdown'
import { NBaseIcon } from '../../../_internal'
import { ChevronDownIcon } from '../../../_internal/icons'
import { dataTableInjectionKey } from '../interface'

export enum DataTableCheckOption {
  CHECK_ALL,
  UNCHECK_ALL
}

function createSelectHandler (
  options:
  | Array<
  | DataTableCheckOption
  | { label: string, key: string | number, onSelect: () => void }
  >
  | undefined,
  doCheckAll: (checkWholeTable?: boolean) => void,
  doUncheckAll: (checkWholeTable?: boolean) => void
): (key: string | number) => void {
  if (!options) return () => {}
  return (key: string | number) => {
    for (const option of options) {
      switch (key) {
        case DataTableCheckOption.CHECK_ALL:
          doCheckAll(true)
          return
        case DataTableCheckOption.UNCHECK_ALL:
          doUncheckAll(true)
          return
        default:
          if (typeof option === 'object' && option.key === key) {
            option.onSelect()
            return
          }
      }
    }
  }
}

function createDropdownOptions (
  options:
  | Array<
  | DataTableCheckOption
  | { label: string, key: string | number, onSelect: () => void }
  >
  | undefined
): Array<{ label: string, key: string | number }> {
  if (!options) return []
  return options.map((option) => {
    switch (option) {
      case DataTableCheckOption.CHECK_ALL:
        return {
          label: '选择表格全部数据',
          key: DataTableCheckOption.CHECK_ALL
        }
      case DataTableCheckOption.UNCHECK_ALL:
        return {
          label: '选择表格全部数据取消',
          key: DataTableCheckOption.UNCHECK_ALL
        }
      default:
        return option
    }
  })
}

export default defineComponent({
  name: 'DataTableCheckMenu',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDataTable = inject(dataTableInjectionKey)!
    const { doCheckAll, doUncheckAll } = NDataTable
    return {
      handleSelect: createSelectHandler(
        NDataTable.checkOptions,
        doCheckAll,
        doUncheckAll
      ),
      options: computed(() => createDropdownOptions(NDataTable.checkOptions))
    }
  },
  render () {
    return (
      <NDropdown options={this.options} onSelect={this.handleSelect}>
        {{
          default: () => (
            <NBaseIcon clsPrefix="n" class="n-data-table-check-extra">
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
