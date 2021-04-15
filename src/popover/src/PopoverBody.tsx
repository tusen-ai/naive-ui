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
  toRef,
  provide,
  CSSProperties,
  VNode,
  renderSlot
} from 'vue'
import { VFollower, FollowerPlacement, FollowerRef } from 'vueuc'
import { clickoutside, mousemoveoutside } from 'vdirs'
import { useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, useAdjustedTo } from '../../_utils'
import { popoverLight } from '../styles'
import type { PopoverTheme } from '../styles'
import style from './styles/index.cssr'
import type { PopoverInjection } from './Popover'
import type { PopoverTrigger } from './interface'
import { popoverBodyInjectionKey } from './interface'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'

export const popoverBodyProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  to: useAdjustedTo.propTo,
  show: Boolean,
  trigger: String as PropType<PopoverTrigger>,
  showArrow: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  displayDirective: String as PropType<'if' | 'show'>,
  x: Number,
  y: Number,
  filp: Boolean,
  overlap: Boolean,
  placement: String as PropType<FollowerPlacement>,
  width: [Number, String] as PropType<number | 'trigger'>,
  // private
  shadow: Boolean,
  padded: Boolean,
  animated: Boolean,
  /** @deprecated */
  minWidth: Number,
  maxWidth: Number
}

export default defineComponent({
  name: 'PopoverBody',
  inheritAttrs: false,
  props: popoverBodyProps,
  setup (props, { slots, attrs }) {
    const { namespace, mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Popover',
      'Popover',
      style,
      popoverLight,
      props,
      mergedClsPrefix
    )
    const followerRef = ref<FollowerRef | null>(null)
    const NPopover = inject<PopoverInjection>('NPopover') as PopoverInjection
    const bodyRef = ref<HTMLElement | null>(null)
    const followerEnabledRef = ref(props.show)
    const directivesRef = computed<DirectiveArguments>(() => {
      const { trigger } = props
      const directives = []
      const { positionManually } = NPopover
      if (!positionManually) {
        if (trigger === 'click') {
          directives.push([clickoutside, handleClickOutside])
        }
        if (trigger === 'hover') {
          directives.push([mousemoveoutside, handleMouseMoveOutside])
        }
      }
      if (props.displayDirective === 'show') {
        directives.push([vShow, props.show])
      }
      return directives as DirectiveArguments
    })
    const styleRef = computed(() => {
      return [
        {
          width: props.width === 'trigger' ? '' : formatLength(props.width),
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
    provide(popoverBodyInjectionKey, bodyRef)
    provide(drawerBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)

    function renderContentNode (): VNode | null {
      const cPrefix = mergedClsPrefix.value
      return props.displayDirective === 'show' || props.show
        ? withDirectives(
          h(
            'div',
            mergeProps(
              {
                class: [
                    `${cPrefix}-popover`,
                    {
                      [`${cPrefix}-popover--overlap`]: props.overlap,
                      [`${cPrefix}-popover--no-arrow`]: !props.showArrow,
                      [`${cPrefix}-popover--shadow`]: props.shadow,
                      [`${cPrefix}-popover--padded`]: props.padded,
                      [`${cPrefix}-popover--raw`]: props.raw
                    }
                ],
                ref: bodyRef,
                style: styleRef.value,
                onMouseenter: handleMouseEnter,
                onMouseleave: handleMouseLeave
              },
              attrs
            ),
            [
              renderSlot(slots, 'default'),
              props.showArrow ? (
                <div
                  class={`${cPrefix}-popover-arrow-wrapper`}
                  key="__popover-arrow__"
                >
                  <div
                    class={`${cPrefix}-popover-arrow`}
                    style={props.arrowStyle}
                  />
                </div>
              ) : null
            ]
          ),
          directivesRef.value
        )
        : null
    }

    return {
      namespace,
      NPopover,
      followerRef,
      adjustedTo: useAdjustedTo(props),
      followerEnabled: followerEnabledRef,
      renderContentNode
    }
  },
  render () {
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
        ref: 'followerRef',
        overlap: this.overlap,
        width: this.width === 'trigger' ? 'target' : undefined,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey
      },
      {
        default: () => {
          return this.animated
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
                default: this.renderContentNode
              }
            )
            : this.renderContentNode()
        }
      }
    )
  }
})
