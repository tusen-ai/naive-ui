import { computed, defineComponent, h, PropType } from 'vue'
import { ChevronDownFilledIcon } from '../../_internal/icons'
import { render as Render } from '../../_utils'
import { NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'MenuOptionContent',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: [String, Function],
    icon: Function,
    extra: [String, Function],
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
    paddingLeft: Number,
    maxIconSize: {
      type: Number,
      required: true
    },
    activeIconSize: {
      type: Number,
      required: true
    },
    iconMarginRight: {
      type: Number,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
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
    const { clsPrefix: mergedClsPrefix } = this
    return (
      <div
        onClick={this.onClick}
        class={[
          `${mergedClsPrefix}-menu-item-content`,
          {
            [`${mergedClsPrefix}-menu-item-content--collapsed`]: this.collapsed,
            [`${mergedClsPrefix}-menu-item-content--child-active`]: this
              .childActive,
            [`${mergedClsPrefix}-menu-item-content--disabled`]: this.disabled,
            [`${mergedClsPrefix}-menu-item-content--hover`]: this.hover
          }
        ]}
        style={this.style}
      >
        {this.icon ? (
          <div
            class={`${mergedClsPrefix}-menu-item-content__icon`}
            style={this.iconStyle}
          >
            <Render render={this.icon} />
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-menu-item-content-header`}>
          <Render render={this.title} />
          {this.extra ? (
            <span class={`${mergedClsPrefix}-menu-item-content-header__extra`}>
              {' '}
              <Render render={this.extra} />
            </span>
          ) : null}
        </div>
        {this.showArrow ? (
          <NBaseIcon
            class={`${mergedClsPrefix}-menu-item-content__arrow`}
            clsPrefix={mergedClsPrefix}
          >
            {{
              default: () => <ChevronDownFilledIcon />
            }}
          </NBaseIcon>
        ) : null}
      </div>
    )
  }
})
