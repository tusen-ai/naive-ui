import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  renderSlot,
  VNode,
  CSSProperties
} from 'vue'
import { NButton } from '../../button'
import { NBaseIcon } from '../../_internal'
import { WarningIcon } from '../../_internal/icons'
import { useLocale } from '../../_mixins'
import { keysOf } from '../../_utils'
import type { PopconfirmInjection } from './interface'

export const panelProps = {
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  onPositiveClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true
  },
  onNegativeClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true
  }
} as const

export const panelPropKeys = keysOf(panelProps)

export default defineComponent({
  name: 'NPopconfirmPanel',
  props: panelProps,
  setup (props) {
    const { locale: localeRef } = useLocale('Popconfirm')
    const NPopconfirm = inject<PopconfirmInjection>(
      'NPopconfirm'
    ) as PopconfirmInjection
    return {
      ...useLocale('Popconfirm'),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { fontSize, iconSize, iconColor }
        } = NPopconfirm.mergedTheme
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--icon-size': iconSize,
          '--icon-color': iconColor
        }
      }),
      localizedPositiveText: computed(() => {
        return props.positiveText || localeRef.value.positiveText
      }),
      localizedNegativeText: computed(() => {
        return props.negativeText || localeRef.value.negativeText
      }),
      handlePositiveClick (e: MouseEvent) {
        props.onPositiveClick(e)
      },
      handleNegativeClick (e: MouseEvent) {
        props.onNegativeClick(e)
      }
    }
  },
  render () {
    return (
      <div style={this.cssVars as CSSProperties}>
        <div class="n-popconfirm__body">
          {this.showIcon ? (
            <div class="n-popconfirm__icon">
              <slot name="icon">
                <NBaseIcon>{{ default: () => <WarningIcon /> }}</NBaseIcon>
              </slot>
            </div>
          ) : null}
          {renderSlot(this.$slots, 'default')}
        </div>
        <div class="n-popconfirm__action">
          {renderSlot(
            this.$slots,
            'action',
            undefined,
            () =>
              [
                <NButton size="small" onClick={this.handleNegativeClick}>
                  {this.localizedNegativeText}
                </NButton>,
                <NButton
                  size="small"
                  type="primary"
                  onClick={this.handlePositiveClick}
                >
                  {this.localizedPositiveText}
                </NButton>
              ] as VNode[]
          )}
        </div>
      </div>
    )
  }
})
