import { type PropType, computed, defineComponent, h, inject, ref } from 'vue'
import { NCheckbox, NCheckboxGroup } from '../../../checkbox'
import { NRadio, NRadioGroup } from '../../../radio'
import { NButton } from '../../../button'
import { NScrollbar } from '../../../_internal'
import { shouldUseArrayInSingleMode } from '../utils'
import {
  type FilterOption,
  type FilterOptionValue,
  type OnFilterMenuChange,
  type OnFilterMenuChangeImpl,
  type TableBaseColumn,
  dataTableInjectionKey
} from '../interface'
import { useConfig, useRtl } from '../../../_mixins'

export default defineComponent({
  name: 'DataTableFilterMenu',
  props: {
    column: {
      type: Object as PropType<TableBaseColumn>,
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
    onClear: {
      type: Function as PropType<() => void>,
      required: true
    },
    onChange: {
      type: Function as PropType<OnFilterMenuChange>,
      required: true
    }
  },
  setup(props) {
    const { mergedClsPrefixRef: mergedClsPrefixRefRtl, mergedRtlRef }
      = useConfig(props)
    const rtlEnabledRef = useRtl(
      'DataTable',
      mergedRtlRef,
      mergedClsPrefixRefRtl
    )

    const { mergedClsPrefixRef, mergedThemeRef, localeRef } = inject(
      dataTableInjectionKey
    )!
    // to be compared with changed value
    // const initialValueRef = ref(props.value)
    const temporalValueRef = ref(props.value)
    const checkboxGroupValueRef = computed(() => {
      const { value: temporalValue } = temporalValueRef
      if (!Array.isArray(temporalValue))
        return null
      return temporalValue
    })
    const radioGroupValueRef = computed(() => {
      const { value: temporalValue } = temporalValueRef
      if (shouldUseArrayInSingleMode(props.column)) {
        return (
          (Array.isArray(temporalValue)
            && temporalValue.length
            && temporalValue[0])
            || null
        )
      }
      if (!Array.isArray(temporalValue))
        return temporalValue
      return null
    })
    function doChange(
      value: FilterOptionValue | FilterOptionValue[] | null
    ): void {
      // May need to check if equal
      ;(props.onChange as OnFilterMenuChangeImpl)(value)
    }
    function handleChange(
      value: FilterOptionValue | FilterOptionValue[]
    ): void {
      if (props.multiple && Array.isArray(value)) {
        temporalValueRef.value = value
      }
      else if (
        shouldUseArrayInSingleMode(props.column)
        && !Array.isArray(value)
      ) {
        /** this branch is for compatibility */
        temporalValueRef.value = [value]
      }
      else {
        temporalValueRef.value = value
      }
    }
    function handleConfirmClick(): void {
      doChange(temporalValueRef.value)
      props.onConfirm()
    }
    function handleClearClick(): void {
      if (props.multiple || shouldUseArrayInSingleMode(props.column)) {
        doChange([])
      }
      else {
        doChange(null)
      }
      props.onClear()
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedTheme: mergedThemeRef,
      locale: localeRef,
      checkboxGroupValue: checkboxGroupValueRef,
      radioGroupValue: radioGroupValueRef,
      handleChange,
      handleConfirmClick,
      handleClearClick
    }
  },
  render() {
    const { mergedTheme, locale, mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-data-table-filter-menu`,
          this.rtlEnabled && `${mergedClsPrefix}-data-table-filter-menu--rtl`
        ]}
      >
        <NScrollbar>
          {{
            default: () => {
              const { checkboxGroupValue, handleChange } = this
              return this.multiple ? (
                <NCheckboxGroup
                  value={checkboxGroupValue}
                  class={`${mergedClsPrefix}-data-table-filter-menu__group`}
                  onUpdateValue={handleChange}
                >
                  {{
                    default: () =>
                      this.options.map((option) => {
                        return (
                          <NCheckbox
                            key={option.value}
                            theme={mergedTheme.peers.Checkbox}
                            themeOverrides={mergedTheme.peerOverrides.Checkbox}
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
                  class={`${mergedClsPrefix}-data-table-filter-menu__group`}
                  value={this.radioGroupValue}
                  onUpdateValue={this.handleChange}
                >
                  {{
                    default: () =>
                      this.options.map(option => (
                        <NRadio
                          key={option.value}
                          value={option.value}
                          theme={mergedTheme.peers.Radio}
                          themeOverrides={mergedTheme.peerOverrides.Radio}
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
        <div class={`${mergedClsPrefix}-data-table-filter-menu__action`}>
          <NButton
            size="tiny"
            theme={mergedTheme.peers.Button}
            themeOverrides={mergedTheme.peerOverrides.Button}
            onClick={this.handleClearClick}
          >
            {{ default: () => locale.clear }}
          </NButton>
          <NButton
            theme={mergedTheme.peers.Button}
            themeOverrides={mergedTheme.peerOverrides.Button}
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
