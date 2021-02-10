import { h, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { renderFilter, renderSorter } from './data-table'
import { unconfigurableStyle, mountSvgDefs } from './unconfigurable-style'
import { themeOverrides } from './theme-overrides'

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
        onBeforeMount={this.onBeforeMount}
      >
        {this.$slots}
      </NConfigProvider>
    )
  }
})
