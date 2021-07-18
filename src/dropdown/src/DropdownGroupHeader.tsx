import { defineComponent, h, inject } from 'vue'
import { render } from '../../_utils'
import { dropdownInjectionKey } from './Dropdown'
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
      hasSubmenuRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dropdownMenuInjectionKey)!

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { renderLabelRef } = inject(dropdownInjectionKey)!

    return {
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef,
      renderLabel: renderLabelRef
    }
  },
  render () {
    const { clsPrefix, hasSubmenu, showIcon, renderLabel } = this
    const { rawNode } = this.tmNode
    return (
      <div class={`${clsPrefix}-dropdown-option`}>
        <div
          class={`${clsPrefix}-dropdown-option-body ${clsPrefix}-dropdown-option-body--group`}
        >
          <div
            __dropdown-option
            class={[
              `${clsPrefix}-dropdown-option-body__prefix`,
              showIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`
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
