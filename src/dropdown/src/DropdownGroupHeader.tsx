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
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      NDropdownMenu: inject(dropdownMenuInjectionKey)!
    }
  },
  render () {
    const { clsPrefix } = this
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
              this.NDropdownMenu.showIcon &&
                `${clsPrefix}-dropdown-option-body__prefix--show-icon`
            ]}
          >
            {h(render, { render: rawNode.icon })}
          </div>
          <div
            class={`${clsPrefix}-dropdown-option-body__label`}
            __dropdown-option
          >
            {h(render, { render: rawNode.label ?? rawNode.title })}
          </div>
          <div
            class={[
              `${clsPrefix}-dropdown-option-body__suffix`,
              this.NDropdownMenu.hasSubmenu &&
                `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
            ]}
            __dropdown-option
          />
        </div>
      </div>
    )
  }
})
