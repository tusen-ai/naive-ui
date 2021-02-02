import { h, defineComponent, PropType } from 'vue'
import { SwitcherIcon } from '../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
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
    return (
      <span
        class={[
          'n-tree-node-switcher',
          {
            'n-tree-node-switcher--expanded': this.expanded,
            'n-tree-node-switcher--hide': this.hide
          }
        ]}
        onClick={this.onClick}
      >
        <div class="n-tree-node-switcher__icon">
          <NIconSwitchTransition>
            {{
              default: () =>
                !this.loading ? (
                  <NBaseIcon key="switcher">
                    {{ default: () => <SwitcherIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseLoading key="loading" />
                )
            }}
          </NIconSwitchTransition>
        </div>
      </span>
    )
  }
})
