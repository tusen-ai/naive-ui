import {
  h,
  defineComponent,
  computed,
  inject,
  type PropType,
  type VNodeChild,
  type CSSProperties
} from 'vue'
import { getPadding } from 'seemly'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { createKey, keysOf, render } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import { useConfig, useThemeClass, useRtl } from '../../_mixins'
import { notificationProviderInjectionKey } from './context'

const iconRenderMap = {
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />,
  default: () => null
}

export const notificationProps = {
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  avatar: Function as PropType<() => VNodeChild>,
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  description: [String, Function] as PropType<string | (() => VNodeChild)>,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  meta: [String, Function] as PropType<string | (() => VNodeChild)>,
  action: [String, Function] as PropType<string | (() => VNodeChild)>,
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  },
  keepAliveOnHover: Boolean,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>
} as const

export const notificationPropKeys = keysOf(notificationProps)

export const Notification = defineComponent({
  name: 'Notification',
  props: notificationProps,
  setup (props) {
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: providerProps
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(notificationProviderInjectionKey)!
    const { inlineThemeDisabled, mergedRtlRef } = useConfig()
    const rtlEnabledRef = useRtl(
      'Notification',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { type } = props
      const {
        self: {
          color,
          textColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          headerTextColor,
          descriptionTextColor,
          actionTextColor,
          borderRadius,
          headerFontWeight,
          boxShadow,
          lineHeight,
          fontSize,
          closeMargin,
          closeSize,
          width,
          padding,
          closeIconSize,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          titleFontSize,
          metaFontSize,
          descriptionFontSize,
          [createKey('iconColor', type)]: iconColor
        },
        common: { cubicBezierEaseOut, cubicBezierEaseIn, cubicBezierEaseInOut }
      } = mergedThemeRef.value
      const { left, right, top, bottom } = getPadding(padding)
      return {
        '--n-color': color,
        '--n-font-size': fontSize,
        '--n-text-color': textColor,
        '--n-description-text-color': descriptionTextColor,
        '--n-action-text-color': actionTextColor,
        '--n-title-text-color': headerTextColor,
        '--n-title-font-weight': headerFontWeight,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-bezier-ease-out': cubicBezierEaseOut,
        '--n-bezier-ease-in': cubicBezierEaseIn,
        '--n-border-radius': borderRadius,
        '--n-box-shadow': boxShadow,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-line-height': lineHeight,
        '--n-icon-color': iconColor,
        '--n-close-margin': closeMargin,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-width': width,
        '--n-padding-left': left,
        '--n-padding-right': right,
        '--n-padding-top': top,
        '--n-padding-bottom': bottom,
        '--n-title-font-size': titleFontSize,
        '--n-meta-font-size': metaFontSize,
        '--n-description-font-size': descriptionFontSize
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'notification',
        computed(() => props.type[0]),
        cssVarsRef,
        providerProps
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      showAvatar: computed(() => {
        return props.avatar || props.type !== 'default'
      }),
      handleCloseClick () {
        props.onClose()
      },
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-notification-wrapper`, this.themeClass]}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            `${mergedClsPrefix}-notification`,
            this.rtlEnabled && `${mergedClsPrefix}-notification--rtl`,
            this.themeClass,
            {
              [`${mergedClsPrefix}-notification--closable`]: this.closable,
              [`${mergedClsPrefix}-notification--show-avatar`]: this.showAvatar
            }
          ]}
          style={this.cssVars as CSSProperties}
        >
          {this.showAvatar ? (
            <div class={`${mergedClsPrefix}-notification__avatar`}>
              {this.avatar ? (
                render(this.avatar)
              ) : this.type !== 'default' ? (
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => iconRenderMap[this.type]() }}
                </NBaseIcon>
              ) : null}
            </div>
          ) : null}
          {this.closable ? (
            <NBaseClose
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-notification__close`}
              onClick={this.handleCloseClick}
            />
          ) : null}
          <div ref="bodyRef" class={`${mergedClsPrefix}-notification-main`}>
            {this.title ? (
              <div class={`${mergedClsPrefix}-notification-main__header`}>
                {render(this.title)}
              </div>
            ) : null}
            {this.description ? (
              <div class={`${mergedClsPrefix}-notification-main__description`}>
                {render(this.description)}
              </div>
            ) : null}
            {this.content ? (
              <pre class={`${mergedClsPrefix}-notification-main__content`}>
                {render(this.content)}
              </pre>
            ) : null}
            {this.meta || this.action ? (
              <div class={`${mergedClsPrefix}-notification-main-footer`}>
                {this.meta ? (
                  <div
                    class={`${mergedClsPrefix}-notification-main-footer__meta`}
                  >
                    {render(this.meta)}
                  </div>
                ) : null}
                {this.action ? (
                  <div
                    class={`${mergedClsPrefix}-notification-main-footer__action`}
                  >
                    {render(this.action)}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
})
