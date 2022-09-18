import { h, defineComponent, inject, computed, Ref } from 'vue'
import { NDropdown } from '../../../dropdown'
import { NLocale } from '../../../locales'
import { NBaseIcon } from '../../../_internal'
import { ChevronDownIcon } from '../../../_internal/icons'
import type { InternalRowData, DataTableSelectionOption } from '../interface'
import { dataTableInjectionKey } from '../interface'

const allKey = '_n_all__'
const noneKey = '_n_none__'

function createSelectHandler (
  options:
  | Array<
  | DataTableSelectionOption
  | {
    label: string
    key: string | number
    onSelect: (pageData: InternalRowData[]) => void
  }
  >
  | undefined,
  rawPaginatedDataRef: Ref<InternalRowData[]>,
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
        case noneKey:
          doUncheckAll(true)
          return
        default:
          if (typeof option === 'object' && option.key === key) {
            option.onSelect(rawPaginatedDataRef.value)
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
  | {
    label: string
    key: string | number
    onSelect: (pageData: InternalRowData[]) => void
  }
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
  setup (props) {
    const {
      props: dataTableProps,
      localeRef,
      checkOptionsRef,
      rawPaginatedDataRef,
      doCheckAll,
      doUncheckAll
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const handleSelectRef = computed(() =>
      createSelectHandler(
        checkOptionsRef.value,
        rawPaginatedDataRef,
        doCheckAll,
        doUncheckAll
      )
    )
    const optionsRef = computed(() =>
      createDropdownOptions(checkOptionsRef.value, localeRef.value)
    )
    return () => {
      const { clsPrefix } = props
      return (
        <NDropdown
          theme={dataTableProps.theme?.peers?.Dropdown}
          themeOverrides={dataTableProps.themeOverrides?.peers?.Dropdown}
          options={optionsRef.value}
          onSelect={handleSelectRef.value}
        >
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
  }
})
