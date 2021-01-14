import { defineComponent, h, inject } from 'vue'
import { render } from '../../_utils'
import { NDropdownMenuInjection } from './DropdownMenu'

export default defineComponent({
  name: 'DropdownGroupHeader',
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {
      NDropdownMenu: inject<NDropdownMenuInjection>(
        'NDropdownMenu'
      ) as NDropdownMenuInjection
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
              // TODO: Workaround, menu campatible
              [h(render, { render: rawNode.label ?? rawNode.title })]
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
