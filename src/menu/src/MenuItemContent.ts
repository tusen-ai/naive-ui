import { computed, defineComponent, h } from 'vue'
import { ChevronDownFilledIcon } from '../../_internal/icons'
import { render } from '../../_utils'
import { NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'MenuItemContent',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    paddingLeft: {
      type: Number,
      default: undefined
    },
    maxIconSize: {
      type: Number,
      default: undefined
    },
    activeIconSize: {
      type: Number,
      default: undefined
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    icon: {
      type: [String, Function],
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    childActive: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    iconMarginRight: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    return {
      style: computed(() => {
        const { paddingLeft } = props
        return { paddingLeft: paddingLeft && `${paddingLeft}px` }
      }),
      iconStyle: computed(() => {
        const { maxIconSize, activeIconSize, iconMarginRight } = props
        return {
          width: `${maxIconSize}px`,
          height: `${maxIconSize}px`,
          fontSize: `${activeIconSize}px`,
          marginRight: `${iconMarginRight}px`
        }
      })
    }
  },
  render () {
    return h(
      'div',
      {
        class: [
          'n-menu-item-content',
          {
            'n-menu-item-content--collapsed': this.collapsed,
            'n-menu-item-content--child-active': this.childActive,
            'n-menu-item-content--disabled': this.disabled,
            'n-menu-item-content--hover': this.hover
          }
        ],
        style: this.style
      },
      [
        this.icon &&
          h(
            'div',
            {
              class: 'n-menu-item-content__icon',
              style: this.iconStyle
            },
            [
              h(render, {
                render: this.icon
              })
            ]
          ),
        h(
          'div',
          {
            class: 'n-menu-item-content-header'
          },
          [
            h(render, {
              render: this.title
            })
          ]
        ),
        this.showArrow
          ? h(
            NBaseIcon,
            {
              class: 'n-menu-item-content__arrow'
            },
            {
              default: () => h(ChevronDownFilledIcon)
            }
          )
          : null
      ]
    )
  }
})
