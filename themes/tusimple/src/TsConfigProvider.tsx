import {
  h,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  PropType
} from 'vue'
import { NConfigProvider, configProviderProps } from 'naive-ui'
import { merge } from 'lodash-es'
import { renderFilter, renderSorter } from './data-table'
import { unconfigurableStyle, mountSvgDefs } from './unconfigurable-style-light'
import { themeOverridesLight } from './theme-overrides-light'
import { themeOverridesDark } from './theme-overrides-dark'
import { icons as tusimpleIcons } from './icons'

const tusimpleComponentOptions = {
  Pagination: {
    inputSize: 'medium'
  },
  DatePicker: {
    timePickerSize: 'medium'
  },
  Dialog: {
    iconPlacement: 'top'
  },
  DataTable: {
    renderFilter,
    renderSorter
  },
  DynamicInput: {
    buttonSize: 'small'
  }
} as const

export default defineComponent({
  name: 'TsConfigProvider',
  props: {
    themeName: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light'
    },
    ...configProviderProps
  },
  setup () {
    onBeforeMount(() => {
      mountSvgDefs()
      unconfigurableStyle.mount({
        id: 'naive-ui/tusimple-theme'
      })
    })
    onBeforeUnmount(() => {
      unconfigurableStyle.unmount()
    })
  },
  render () {
    const { $props } = this
    const { themeOverrides, componentOptions, icons, themeName } = $props
    const tusimpleThemeOverrides =
      themeName === 'light' ? themeOverridesLight : themeOverridesDark
    return (
      <NConfigProvider
        class={`ts-${themeName}-theme`}
        {...$props}
        themeOverrides={
          themeOverrides
            ? merge({}, tusimpleThemeOverrides, themeOverrides)
            : tusimpleThemeOverrides
        }
        componentOptions={
          componentOptions
            ? merge({}, tusimpleComponentOptions, componentOptions)
            : tusimpleComponentOptions
        }
        icons={icons ? merge({}, tusimpleIcons, icons) : tusimpleIcons}
      >
        {this.$slots}
      </NConfigProvider>
    )
  }
})
