import { h, defineComponent, type PropType, inject } from 'vue'
import { SwitcherIcon } from '../../_internal/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_internal'
import { type TmNode, treeInjectionKey } from './interface'

export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: { type: Number, required: true },
    expanded: Boolean,
    selected: Boolean,
    hide: Boolean,
    loading: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { renderSwitcherIconRef } = inject(treeInjectionKey, null)!
    return () => {
      const { clsPrefix, expanded, hide, indent, onClick } = props
      return (
        <span
          data-switcher
          class={[
            `${clsPrefix}-tree-node-switcher`,
            expanded && `${clsPrefix}-tree-node-switcher--expanded`,
            hide && `${clsPrefix}-tree-node-switcher--hide`
          ]}
          style={{ width: `${indent}px` }}
          onClick={onClick}
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
                      selected: props.selected,
                      option: props.tmNode.rawNode
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
