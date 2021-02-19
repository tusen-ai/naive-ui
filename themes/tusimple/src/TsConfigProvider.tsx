import { h, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue'
import { NConfigProvider, configProviderProps } from 'naive-ui'
import { renderFilter, renderSorter } from './data-table'
import { unconfigurableStyle, mountSvgDefs } from './unconfigurable-style'
import { themeOverrides } from './theme-overrides'
import { icons } from './icons'

export default defineComponent({
  name: 'TsConfigProvider',
  props: configProviderProps,
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
