import { computed, defineComponent, h, inject } from 'vue'
import { render } from '../../_utils'
import { dropdownMenuInjectionKey } from './DropdownMenu'

export default defineComponent({
  name: 'DropdownGroupHeader',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {
      showIconRef,
      hasSubmenuRef,
      renderLabelRef,
      renderIconRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dropdownMenuInjectionKey)!

    return {
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef,
      renderLabel: renderLabelRef,
      renderIcon: renderIconRef
    }
  },
  render () {
    const { clsPrefix, hasSubmenu, showIcon, renderLabel, renderIcon } = this
    const { rawNode } = this.tmNode
    const nodeHasIcon = computed(() => !!renderIcon?.(rawNode))
    return (
      <div class={`${clsPrefix}-dropdown-option`}>
        <div
          class={`${clsPrefix}-dropdown-option-body ${clsPrefix}-dropdown-option-body--group`}
        >
          <div
            __dropdown-option
            class={[
              `${clsPrefix}-dropdown-option-body__prefix`,
              (showIcon || nodeHasIcon) &&
                `${clsPrefix}-dropdown-option-body__prefix--show-icon`
            ]}
          >
            {render(rawNode.icon)}
          </div>
          <div
            class={`${clsPrefix}-dropdown-option-body__label`}
            __dropdown-option
          >
            {renderLabel
              ? renderLabel(rawNode)
              : render(rawNode.label ?? rawNode.title)}
          </div>
          <div
            class={[
              `${clsPrefix}-dropdown-option-body__suffix`,
              hasSubmenu &&
                `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
            ]}
            __dropdown-option
          />
        </div>
      </div>
    )
  }
})
