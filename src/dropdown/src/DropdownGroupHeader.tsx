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
  setup () {
    const {
      showIconRef,
      hasSubmenuRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dropdownMenuInjectionKey)!

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { renderLabelRef, labelFieldRef } = inject(dropdownInjectionKey)!

    return {
      labelField: labelFieldRef,
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
            data-dropdown-option
            class={[
              `${clsPrefix}-dropdown-option-body__prefix`,
              showIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`
            ]}
          >
            {render(rawNode.icon)}
          </div>
          <div
            class={`${clsPrefix}-dropdown-option-body__label`}
            data-dropdown-option
          >
            {renderLabel
              ? renderLabel(rawNode)
              : render(rawNode.title ?? rawNode[this.labelField])}
          </div>
          <div
            class={[
              `${clsPrefix}-dropdown-option-body__suffix`,
              hasSubmenu &&
                `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
            ]}
            data-dropdown-option
          />
        </div>
      </div>
    )
  }
})
