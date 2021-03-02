import {
  h,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  PropType
} from 'vue'
import { NConfigProvider, configProviderProps } from 'naive-ui'
import { renderFilter, renderSorter } from './data-table'
import { unconfigurableStyle, mountSvgDefs } from './unconfigurable-style-light'
import { themeOverrides } from './theme-overrides-light'
import { icons } from './icons'

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
    return {
      componentOptions: {
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
    }
  },
  render () {
    return (
      <NConfigProvider
        class={`ts-${this.themeName}-theme`}
        {...this.$props}
        themeOverrides={themeOverrides}
        componentOptions={this.componentOptions}
        icons={icons}
      >
        {this.$slots}
      </NConfigProvider>
    )
  }
})
