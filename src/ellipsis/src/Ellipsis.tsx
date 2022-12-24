import {
  defineComponent,
  h,
  ref,
  PropType,
  computed,
  mergeProps,
  onDeactivated
} from 'vue'
import type { PopoverProps } from '../../popover/src/Popover'
import { TooltipInst } from '../../tooltip/src/Tooltip'
import { NTooltip } from '../../tooltip'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { ellipsisLight } from '../styles'
import type { EllipsisTheme } from '../styles'
import style from './styles/index.cssr'

function createLineClampClass (clsPrefix: string): string {
  return `${clsPrefix}-ellipsis--line-clamp`
}

function createCursorClass (clsPrefix: string, cursor: string): string {
  return `${clsPrefix}-ellipsis--cursor-${cursor}`
}

export const ellipsisProps = {
  ...(useTheme.props as ThemeProps<EllipsisTheme>),
  expandTrigger: String as PropType<'click'>,
  lineClamp: [Number, String] as PropType<string | number>,
  tooltip: {
    type: [Boolean, Object] as PropType<PopoverProps | boolean>,
    default: true
  }
} as const

export type EllipsisProps = ExtractPublicPropTypes<typeof ellipsisProps>

export default defineComponent({
  name: 'Ellipsis',
  inheritAttrs: false,
  props: ellipsisProps,
  setup (props, { slots, attrs }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const mergedTheme = useTheme(
      'Ellipsis',
      '-ellipsis',
      style,
      ellipsisLight,
      props,
      mergedClsPrefixRef
    )
    const triggerRef = ref<HTMLElement | null>(null)
    const triggerInnerRef = ref<HTMLElement | null>(null)
    const tooltipRef = ref<TooltipInst | null>(null)
    const expandedRef = ref(false)
    const ellipsisStyleRef = computed(() => {
      const { lineClamp } = props
      const { value: expanded } = expandedRef
      if (lineClamp !== undefined) {
        return {
          textOverflow: '',
          '-webkit-line-clamp': expanded ? '' : lineClamp
        }
      } else {
        return {
          textOverflow: expanded ? '' : 'ellipsis',
          '-webkit-line-clamp': ''
        }
      }
    })
    function getTooltipDisabled (): boolean {
      let tooltipDisabled = false
      const { value: expanded } = expandedRef
      if (expanded) return true
      const { value: trigger } = triggerRef
      if (trigger) {
        const { lineClamp } = props
        // we need to apply style here, since the dom may be updated in
        // nextTick, measure dom size will derive wrong result
        syncEllipsisStyle(trigger)
        if (lineClamp !== undefined) {
          tooltipDisabled = trigger.scrollHeight <= trigger.offsetHeight
        } else {
          const { value: triggerInner } = triggerInnerRef
          if (triggerInner) {
            tooltipDisabled =
              triggerInner.getBoundingClientRect().width <=
              trigger.getBoundingClientRect().width
          }
        }
        syncCursorStyle(trigger, tooltipDisabled)
      }
      return tooltipDisabled
    }
    const handleClickRef = computed(() => {
      return props.expandTrigger === 'click'
        ? () => {
            const { value: expanded } = expandedRef
            if (expanded) {
              tooltipRef.value?.setShow(false)
            }
            expandedRef.value = !expanded
          }
        : undefined
    })
    onDeactivated(() => {
      if (props.tooltip) {
        tooltipRef.value?.setShow(false)
      }
    })
    const renderTrigger = (): JSX.Element => (
      <span
        {...mergeProps(attrs, {
          class: [
            `${mergedClsPrefixRef.value}-ellipsis`,
            props.lineClamp !== undefined
              ? createLineClampClass(mergedClsPrefixRef.value)
              : undefined,
            props.expandTrigger === 'click'
              ? createCursorClass(mergedClsPrefixRef.value, 'pointer')
              : undefined
          ],
          style: ellipsisStyleRef.value
        })}
        ref="triggerRef"
        onClick={handleClickRef.value}
        onMouseenter={
          // get tooltip disabled will derive cursor style
          props.expandTrigger === 'click' ? getTooltipDisabled : undefined
        }
      >
        {props.lineClamp ? slots : <span ref="triggerInnerRef">{slots}</span>}
      </span>
    )
    function syncEllipsisStyle (trigger: HTMLElement): void {
      if (!trigger) return
      const latestStyle = ellipsisStyleRef.value
      const lineClampClass = createLineClampClass(mergedClsPrefixRef.value)
      if (props.lineClamp !== undefined) {
        syncTriggerClass(trigger, lineClampClass, 'add')
      } else {
        syncTriggerClass(trigger, lineClampClass, 'remove')
      }
      for (const key in latestStyle) {
        // guard can make it a little faster
        if ((trigger.style as any)[key] !== (latestStyle as any)[key]) {
          ;(trigger.style as any)[key] = (latestStyle as any)[key]
        }
      }
    }
    function syncCursorStyle (
      trigger: HTMLElement,
      tooltipDisabled: boolean
    ): void {
      const cursorClass = createCursorClass(mergedClsPrefixRef.value, 'pointer')
      if (props.expandTrigger === 'click' && !tooltipDisabled) {
        syncTriggerClass(trigger, cursorClass, 'add')
      } else {
        syncTriggerClass(trigger, cursorClass, 'remove')
      }
    }
    function syncTriggerClass (
      trigger: HTMLElement,
      styleClass: string,
      action: 'add' | 'remove'
    ): void {
      if (action === 'add') {
        if (!trigger.classList.contains(styleClass)) {
          trigger.classList.add(styleClass)
        }
      } else {
        if (trigger.classList.contains(styleClass)) {
          trigger.classList.remove(styleClass)
        }
      }
    }
    return {
      mergedTheme,
      triggerRef,
      triggerInnerRef,
      tooltipRef,
      handleClick: handleClickRef,
      renderTrigger,
      getTooltipDisabled
    }
  },
  render () {
    const { tooltip, renderTrigger, $slots } = this
    if (tooltip) {
      const { mergedTheme } = this
      return (
        <NTooltip
          ref="tooltipRef"
          placement="top"
          {...(tooltip as PopoverProps)}
          getDisabled={this.getTooltipDisabled}
          theme={mergedTheme.peers.Tooltip}
          themeOverrides={mergedTheme.peerOverrides.Tooltip}
        >
          {{
            trigger: renderTrigger,
            default: $slots.tooltip ?? $slots.default
          }}
        </NTooltip>
      )
    } else return renderTrigger()
  }
})
