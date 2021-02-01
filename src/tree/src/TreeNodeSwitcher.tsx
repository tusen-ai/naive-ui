import { h, defineComponent } from 'vue'
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
    onClick: Function
  },
  setup (props) {
    function doClick (): void {
      const { onClick } = props
      if (onClick) onClick()
    }
    return {
      handleClick () {
        doClick()
      }
    }
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
        onClick={this.handleClick}
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
