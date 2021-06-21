import { defineComponent, h, inject } from 'vue'
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
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { showIconRef, hasSubmenuRef } = inject(dropdownMenuInjectionKey)!
    return {
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef
    }
  },
  render () {
    const { clsPrefix, hasSubmenu, showIcon } = this
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
            {render(rawNode.label ?? rawNode.title)}
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
