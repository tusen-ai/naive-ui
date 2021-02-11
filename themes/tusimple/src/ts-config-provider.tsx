import { h, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { renderFilter, renderSorter } from './data-table'
import { unconfigurableStyle, mountSvgDefs } from './unconfigurable-style'
import { themeOverrides } from './theme-overrides'
import { icons } from './icons'

export default defineComponent({
  name: 'TsConfigProvider',
  setup () {
    return {
      componentProps: {
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
      } as const,
      onBeforeMount () {
        mountSvgDefs()
        unconfigurableStyle.mount({
          id: 'naive-ui/tusimple-theme'
        })
      }
    }
  },
  render () {
    return (
      <NConfigProvider
        themeOverrides={themeOverrides}
        componentProps={this.componentProps}
        icons={icons}
        onBeforeMount={this.onBeforeMount}
      >
        {this.$slots}
      </NConfigProvider>
    )
  }
})
