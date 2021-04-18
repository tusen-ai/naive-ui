import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  renderSlot,
  CSSProperties
} from 'vue'
import { NButton } from '../../button'
import { NBaseIcon } from '../../_internal'
import { WarningIcon } from '../../_internal/icons'
import { useLocale } from '../../_mixins'
import { keysOf } from '../../_utils'
import { popconfirmInjectionKey } from './interface'

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NPopconfirm = inject(popconfirmInjectionKey)!
    return {
      ...useLocale('Popconfirm'),
      mergedClsPrefix: NPopconfirm.mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { fontSize, iconSize, iconColor }
        } = NPopconfirm.mergedThemeRef.value
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
    const { mergedClsPrefix } = this
    return (
      <div style={this.cssVars as CSSProperties}>
        <div class={`${mergedClsPrefix}-popconfirm__body`}>
          {this.showIcon ? (
            <div class={`${mergedClsPrefix}-popconfirm__icon`}>
              <slot name="icon">
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <WarningIcon /> }}
                </NBaseIcon>
              </slot>
            </div>
          ) : null}
          {renderSlot(this.$slots, 'default')}
        </div>
        <div class={`${mergedClsPrefix}-popconfirm__action`}>
          {renderSlot(this.$slots, 'action', undefined, () => [
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
          ])}
        </div>
      </div>
    )
  }
})
