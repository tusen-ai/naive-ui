import { defineComponent, h, inject } from 'vue'
import { render } from '../../_utils'
import { dropdownInjectionKey, dropdownMenuInjectionKey } from './context'
import type { DropdownMixedOption } from './interface'

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

    const { renderLabelRef, labelFieldRef, nodePropsRef, renderOptionRef } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject(dropdownInjectionKey)!

    return {
      labelField: labelFieldRef,
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef,
      renderLabel: renderLabelRef,
      nodeProps: nodePropsRef,
      renderOption: renderOptionRef
    }
  },
  render () {
    const {
      clsPrefix,
      hasSubmenu,
      showIcon,
      nodeProps,
      renderLabel,
      renderOption
    } = this
    const { rawNode } = this.tmNode
    const node = (
      <div
        class={`${clsPrefix}-dropdown-option`}
        {...nodeProps?.(rawNode as DropdownMixedOption)}
      >
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
              ? renderLabel(rawNode as DropdownMixedOption)
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
    if (renderOption) {
      return renderOption({ node, option: rawNode })
    }
    return node
  }
})
