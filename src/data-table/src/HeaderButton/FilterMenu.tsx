import { h, defineComponent, PropType, ref, computed, inject } from 'vue'
import { NCheckbox, NCheckboxGroup } from '../../../checkbox'
import { NRadio, NRadioGroup } from '../../../radio'
import { NButton } from '../../../button'
import { NScrollbar } from '../../../scrollbar'
import { shouldUseArrayInSingleMode } from '../utils'
import {
  DataTableInjection,
  FilterOption,
  FilterOptionValue,
  OnFilterMenuChange,
  OnFilterMenuChangeImpl,
  TableColumnInfo
} from '../interface'

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    },
    radioGroupName: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    value: {
      type: [Array, String, Number] as PropType<
      FilterOptionValue | FilterOptionValue[] | null
      >,
      default: null
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      required: true
    },
    onConfirm: {
      type: Function as PropType<() => void>,
      required: true
    },
    onCancel: {
      type: Function as PropType<() => void>,
      required: true
    },
    onChange: {
      type: Function as PropType<OnFilterMenuChange>,
      required: true
    }
  },
  setup (props) {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    // to be compared with changed value
    // const initialValueRef = ref(props.value)
    const temporalValueRef = ref(props.value)
    const checkboxGroupValueRef = computed(() => {
      const { value: temporalValue } = temporalValueRef
      if (!Array.isArray(temporalValue)) return null
      return temporalValue
    })
    const radioGroupValueRef = computed(() => {
      const { value: temporalValue } = temporalValueRef
      if (shouldUseArrayInSingleMode(props.column)) {
        return (
          (Array.isArray(temporalValue) &&
            temporalValue.length &&
            temporalValue[0]) ||
          null
        )
      }
      if (!Array.isArray(temporalValue)) return temporalValue
      return null
    })
    function doChange (
      value: FilterOptionValue | FilterOptionValue[] | null
    ): void {
      // May need to check if equal
      ;(props.onChange as OnFilterMenuChangeImpl)(value)
    }
    function handleChange (
      value: FilterOptionValue | FilterOptionValue[]
    ): void {
      if (props.multiple && Array.isArray(value)) {
        temporalValueRef.value = value
      } else if (
        shouldUseArrayInSingleMode(props.column) &&
        !Array.isArray(value)
      ) {
        /** this branch is for compatibility */
        temporalValueRef.value = [value]
      } else {
        temporalValueRef.value = value
      }
    }
    function handleConfirmClick (): void {
      doChange(temporalValueRef.value)
      props.onConfirm()
    }
    function handleClearClick (): void {
      if (props.multiple || shouldUseArrayInSingleMode(props.column)) {
        doChange([])
      } else {
        doChange(null)
      }
      props.onCancel()
    }
    return {
      NDataTable,
      checkboxGroupValue: checkboxGroupValueRef,
      radioGroupValue: radioGroupValueRef,
      handleChange,
      handleConfirmClick,
      handleClearClick
    }
  },
  render () {
    const { NDataTable } = this
    const { mergedTheme, locale } = NDataTable
    return (
      <div class="n-data-table-filter-menu">
        <NScrollbar>
          {{
            default: () => {
              const { checkboxGroupValue, handleChange } = this
              return this.multiple ? (
                <NCheckboxGroup
                  value={checkboxGroupValue}
                  class="n-data-table-filter-menu__group"
                  onUpdateValue={handleChange}
                >
                  {{
                    default: () =>
                      this.options.map((option) => {
                        return (
                          <NCheckbox
                            key={option.value}
                            unstableTheme={mergedTheme.peers.Checkbox}
                            unstableThemeOverrides={
                              mergedTheme.overrides.Checkbox
                            }
                            value={option.value}
                          >
                            {{ default: () => option.label }}
                          </NCheckbox>
                        )
                      })
                  }}
                </NCheckboxGroup>
              ) : (
                <NRadioGroup
                  name={this.radioGroupName}
                  class="n-data-table-filter-menu__group"
                  value={this.radioGroupValue}
                  onUpdateValue={this.handleChange}
                >
                  {{
                    default: () =>
                      this.options.map((option) => (
                        <NRadio
                          key={option.value}
                          value={option.value}
                          unstableTheme={mergedTheme.peers.Radio}
                          unstableThemeOverrides={mergedTheme.overrides.Radio}
                        >
                          {{ default: () => option.label }}
                        </NRadio>
                      ))
                  }}
                </NRadioGroup>
              )
            }
          }}
        </NScrollbar>
        <div class="n-data-table-filter-menu__action">
          <NButton
            size="tiny"
            unstableTheme={mergedTheme.peers.Button}
            unstableThemeOverrides={mergedTheme.overrides.Button}
            onClick={this.handleClearClick}
          >
            {{ default: () => locale.clear }}
          </NButton>
          <NButton
            unstableTheme={mergedTheme.peers.Button}
            unstableThemeOverrides={mergedTheme.overrides.Button}
            type="primary"
            size="tiny"
            onClick={this.handleConfirmClick}
          >
            {{ default: () => locale.confirm }}
          </NButton>
        </div>
      </div>
    )
  }
})
