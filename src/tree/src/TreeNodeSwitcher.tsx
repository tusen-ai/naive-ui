import { h, defineComponent, PropType, inject } from 'vue'
import { SwitcherIcon } from '../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_internal'
import { treeInjectionKey } from './interface'

export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    selected: Boolean,
    hide: Boolean,
    loading: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { renderSwitcherIconRef } = inject(treeInjectionKey, null)!
    return () => {
      const { clsPrefix } = props
      return (
        <span
          data-switcher
          class={[
            `${clsPrefix}-tree-node-switcher`,
            props.expanded && `${clsPrefix}-tree-node-switcher--expanded`,
            props.hide && `${clsPrefix}-tree-node-switcher--hide`
          ]}
          onClick={props.onClick}
        >
          <div class={`${clsPrefix}-tree-node-switcher__icon`}>
            <NIconSwitchTransition>
              {{
                default: () => {
                  if (props.loading) {
                    return (
                      <NBaseLoading
                        clsPrefix={clsPrefix}
                        key="loading"
                        radius={85}
                        strokeWidth={20}
                      />
                    )
                  }
                  const { value: renderSwitcherIcon } = renderSwitcherIconRef
                  return renderSwitcherIcon ? (
                    renderSwitcherIcon({
                      expanded: props.expanded,
                      selected: props.selected
                    })
                  ) : (
                    <NBaseIcon clsPrefix={clsPrefix} key="switcher">
                      {{ default: () => <SwitcherIcon /> }}
                    </NBaseIcon>
                  )
                }
              }}
            </NIconSwitchTransition>
          </div>
        </span>
      )
    }
  }
})
