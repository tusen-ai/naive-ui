import {
  h,
  vShow,
  withDirectives,
  Transition,
  ref,
  defineComponent,
  computed,
  mergeProps,
  inject,
  onBeforeUnmount,
  DirectiveArguments,
  PropType,
  watch,
  toRef
} from 'vue'
import { VFollower, FollowerPlacement, FollowerRef } from 'vueuc'
import { clickoutside, mousemoveoutside } from 'vdirs'
import { useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, useAdjustedTo, getSlot } from '../../_utils'
import { popoverLight } from '../styles'
import type { PopoverTheme } from '../styles'
import style from './styles/index.cssr'
import type { PopoverInjection } from './Popover'

export const popoverBodyProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  show: {
    type: Boolean,
    default: undefined
  },
  trigger: {
    type: String,
    default: undefined
  },
  showArrow: {
    type: Boolean,
    default: undefined
  },
  delay: {
    type: Number,
    default: undefined
  },
  duration: {
    type: Number,
    default: undefined
  },
  raw: {
    type: Boolean,
    default: undefined
  },
  arrowStyle: {
    type: Object,
    default: undefined
  },
  displayDirective: {
    type: String,
    default: undefined
  },
  x: {
    type: Number,
    default: undefined
  },
  y: {
    type: Number,
    default: undefined
  },
  filp: {
    type: Boolean,
    default: undefined
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: undefined
  },
  // private
  shadow: {
    type: Boolean,
    default: undefined
  },
  padded: {
    type: Boolean,
    default: undefined
  },
  animated: {
    type: Boolean,
    default: undefined
  },
  // deprecated
  width: {
    type: Number,
    default: undefined
  },
  minWidth: {
    type: Number,
    default: undefined
  },
  maxWidth: {
    type: Number,
    default: undefined
  }
}

export default defineComponent({
  name: 'PopoverBody',
  inheritAttrs: false,
  props: popoverBodyProps,
  setup (props) {
    const themeRef = useTheme('Popover', 'Popover', style, popoverLight, props)
    const followerRef = ref<FollowerRef | null>(null)
    const NPopover = inject<PopoverInjection>('NPopover') as PopoverInjection
    const followerEnabledRef = ref(props.show)
    const directivesRef = computed<DirectiveArguments>(() => {
      const { trigger } = props
      const directives = []
      if (trigger === 'click') {
        directives.push([clickoutside, handleClickOutside])
      }
      if (trigger === 'hover') {
        directives.push([mousemoveoutside, handleMouseMoveOutside])
      }
      if (props.displayDirective === 'show') {
        directives.push([vShow, props.show])
      }
      return directives as DirectiveArguments
    })
    const styleRef = computed(() => {
      return [
        {
          width: formatLength(props.width),
          maxWidth: formatLength(props.maxWidth),
          minWidth: formatLength(props.minWidth)
        },
        cssVarsRef.value
      ]
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut },
        self: {
          space,
          spaceArrow,
          padding,
          fontSize,
          textColor,
          color,
          boxShadow,
          borderRadius,
          arrowHeight,
          arrowOffset,
          arrowOffsetVertical
        }
      } = themeRef.value
      return {
        '--box-shadow': boxShadow,
        '--bezier': cubicBezierEaseInOut,
        '--bezier-ease-in': cubicBezierEaseIn,
        '--bezier-ease-out': cubicBezierEaseOut,
        '--font-size': fontSize,
        '--text-color': textColor,
        '--color': color,
        '--border-radius': borderRadius,
        '--arrow-height': arrowHeight,
        '--arrow-offset': arrowOffset,
        '--arrow-offset-vertical': arrowOffsetVertical,
        '--padding': padding,
        '--space': space,
        '--space-arrow': spaceArrow
      }
    })
    NPopover.setBodyInstance({
      syncPosition
    })
    onBeforeUnmount(() => {
      NPopover.setBodyInstance(null)
    })
    watch(toRef(props, 'show'), (value) => {
      if (value) followerEnabledRef.value = true
      else {
        if (!props.animated) {
          followerEnabledRef.value = false
        }
      }
    })
    function syncPosition (): void {
      // eslint-disable-next-line no-unused-expressions
      followerRef.value?.syncPosition()
    }
    function handleMouseEnter (e: MouseEvent): void {
      if (props.trigger === 'hover') {
        NPopover.handleMouseEnter(e)
      }
    }
    function handleMouseLeave (e: MouseEvent): void {
      if (props.trigger === 'hover') {
        NPopover.handleMouseLeave(e)
      }
    }
    function handleMouseMoveOutside (e: MouseEvent): void {
      if (
        props.trigger === 'hover' &&
        !getTriggerElement().contains(e.target as Node)
      ) {
        NPopover.handleMouseMoveOutside(e)
      }
    }
    function handleClickOutside (e: MouseEvent): void {
      if (
        props.trigger === 'click' &&
        !getTriggerElement().contains(e.target as Node)
      ) {
        NPopover.handleClickOutside(e)
      }
    }
    function getTriggerElement (): HTMLElement {
      return NPopover.getTriggerElement()
    }
    return {
      ...useConfig(props),
      NPopover,
      followerRef,
      adjustedTo: useAdjustedTo(props),
      followerEnabled: followerEnabledRef,
      style: styleRef,
      directives: directivesRef,
      handleMouseEnter,
      handleMouseLeave
    }
  },
  render () {
    const { animated } = this
    const contentNode =
      this.displayDirective === 'show' || this.show
        ? withDirectives(
          h(
            'div',
            mergeProps(
              {
                class: [
                  'n-popover',
                  {
                    'n-popover--no-arrow': !this.showArrow,
                    'n-popover--shadow': this.shadow,
                    'n-popover--padded': this.padded,
                    'n-popover--raw': this.raw
                  }
                ],
                ref: 'body',
                style: this.style,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave
              },
              this.$attrs
            ),
            [
              getSlot(this),
              this.showArrow
                ? h(
                  'div',
                  {
                    class: 'n-popover-arrow-wrapper'
                  },
                  [
                    h('div', {
                      class: 'n-popover-arrow',
                      style: this.arrowStyle
                    })
                  ]
                )
                : null
            ]
          ),
          this.directives
        )
        : null
    return h(
      VFollower,
      {
        show: this.show,
        enabled: this.followerEnabled,
        to: this.adjustedTo,
        x: this.x,
        y: this.y,
        placement: this.placement,
        containerClass: this.namespace,
        ref: 'followerRef'
      },
      {
        default: () => {
          return animated
            ? h(
              Transition,
              {
                name: 'popover-transition',
                appear: this.NPopover.isMounted,
                onAfterLeave: () => {
                  this.followerEnabled = false
                }
              },
              {
                default: () => contentNode
              }
            )
            : contentNode
        }
      }
    )
  }
})
