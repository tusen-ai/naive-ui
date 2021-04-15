import { defineComponent, h, ref, PropType, computed, mergeProps } from 'vue'
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
  return `${clsPrefix}-ellpisis--line-clamp`
}

const ellpisisProps = {
  ...(useTheme.props as ThemeProps<EllipsisTheme>),
  expandTrigger: String as PropType<'click'>,
  lineClamp: [Number, String] as PropType<string | number>,
  tooltip: {
    type: [Boolean, Object] as PropType<PopoverProps | boolean>,
    default: true
  }
} as const

export type EllipsisProps = ExtractPublicPropTypes<typeof ellpisisProps>

export default defineComponent({
  name: 'Ellipsis',
  inheritAttrs: false,
  props: ellpisisProps,
  setup (props, { slots, attrs }) {
    const { mergedClsPrefix } = useConfig(props)
    const mergedTheme = useTheme(
      'Ellipsis',
      'ellipsis',
      style,
      ellipsisLight,
      props,
      mergedClsPrefix
    )
    const triggerRef = ref<HTMLElement | null>(null)
    const tooltipRef = ref<TooltipInst | null>(null)
    const expandedRef = ref(false)
    const ellpisisStyleRef = computed(() => {
      const { lineClamp } = props
      const { value: expanded } = expandedRef
      const cursor = props.expandTrigger === 'click' ? 'pointer' : ''
      if (lineClamp !== undefined) {
        return {
          cursor,
          textOverflow: '',
          '-webkit-line-clamp': expanded ? '' : lineClamp
        }
      } else {
        return {
          cursor,
          textOverflow: expanded ? '' : 'ellipsis',
          '-webkit-line-clamp': ''
        }
      }
    })
    function getTooltipDisabled (): boolean {
      const { value: expanded } = expandedRef
      if (expanded) return true
      const { value: trigger } = triggerRef
      if (trigger) {
        const { lineClamp } = props
        // we need to apply style here, since the dom may be updated in
        // nextTick, measure dom size will derive wrong result
        syncEllipsisStyle(trigger)
        if (lineClamp !== undefined) {
          return trigger.scrollHeight <= trigger.offsetHeight
        }
        return trigger.scrollWidth <= trigger.offsetWidth
      }
      return false
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
    const renderTrigger = (): JSX.Element => (
      <span
        {...mergeProps(attrs, {
          class: [
            `${mergedClsPrefix.value}-ellpisis`,
            props.lineClamp !== undefined
              ? createLineClampClass(mergedClsPrefix.value)
              : undefined
          ],
          style: ellpisisStyleRef.value
        })}
        ref="triggerRef"
        onClick={handleClickRef.value}
      >
        {slots}
      </span>
    )
    function syncEllipsisStyle (trigger: HTMLElement): void {
      if (!trigger) return
      const latestStyle = ellpisisStyleRef.value
      const lineClampClass = createLineClampClass(mergedClsPrefix.value)
      if (props.lineClamp !== undefined) {
        if (!trigger.classList.contains(lineClampClass)) {
          trigger.classList.add(lineClampClass)
        }
      } else {
        if (trigger.classList.contains(lineClampClass)) {
          trigger.classList.remove(lineClampClass)
        }
      }
      for (const key in latestStyle) {
        // guard can make it a little faster
        if ((trigger.style as any)[key] !== (latestStyle as any)[key]) {
          ;(trigger.style as any)[key] = (latestStyle as any)[key]
        }
      }
    }
    return {
      mergedTheme,
      triggerRef,
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
          {...tooltip}
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
