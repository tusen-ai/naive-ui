import { h, defineComponent, PropType } from 'vue'
import { SwitcherIcon } from '../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix } = this
    return (
      <span
        class={[
          `${clsPrefix}-tree-node-switcher`,
          {
            [`${clsPrefix}-tree-node-switcher--expanded`]: this.expanded,
            [`${clsPrefix}-tree-node-switcher--hide`]: this.hide
          }
        ]}
        onClick={this.onClick}
      >
        <div class={`${clsPrefix}-tree-node-switcher__icon`}>
          <NIconSwitchTransition>
            {{
              default: () =>
                !this.loading ? (
                  <NBaseIcon clsPrefix={clsPrefix} key="switcher">
                    {{ default: () => <SwitcherIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseLoading clsPrefix={clsPrefix} key="loading" />
                )
            }}
          </NIconSwitchTransition>
        </div>
      </span>
    )
  }
})
