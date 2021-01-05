import { defineComponent, h } from 'vue'
import { render } from '../../_utils'

export default defineComponent({
  name: 'DropdownGroupHeader',
  inject: ['NDropdown', 'NDropdownMenu'],
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  render () {
    const { rawNode } = this.tmNode
    return h(
      'div',
      {
        class: 'n-dropdown-option'
      },
      [
        h(
          'div',
          {
            class: 'n-dropdown-option-body  n-dropdown-option-body--group'
          },
          [
            h(
              'div',
              {
                class: [
                  'n-dropdown-option-body__prefix',
                  {
                    'n-dropdown-option-body__prefix--show-icon': this
                      .NDropdownMenu.showIcon
                  }
                ],
                'n-dropdown-option': true
              },
              [h(render, { render: rawNode.icon })]
            ),
            h(
              'div',
              {
                class: 'n-dropdown-option-body__label',
                'n-dropdown-option': true
              },
              [h(render, { render: rawNode.label })]
            ),
            h('div', {
              class: [
                'n-dropdown-option-body__suffix',
                {
                  'n-dropdown-option-body__suffix--has-submenu': this
                    .NDropdownMenu.hasSubmenu
                }
              ],
              'n-dropdown-option': true
            })
          ]
        )
      ]
    )
  }
})
