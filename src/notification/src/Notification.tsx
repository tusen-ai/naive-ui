import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  VNodeChild,
  CSSProperties
} from 'vue'
import { getPadding } from 'seemly'
import { createKey, keysOf, render as Render } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { notificationProviderInjectionKey } from './NotificationProvider'

const iconMap = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  default: null
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
  // BUG
  // Wired Case, can't be set to [String, Function] as PropType<string | (() => VNodeChild)>,
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  description: [String, Function] as PropType<string | (() => VNodeChild)>,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  meta: [String, Function] as PropType<string | (() => VNodeChild)>,
  action: [String, Function] as PropType<string | (() => VNodeChild)>,
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  }
} as const

export const notificationPropKeys = keysOf(notificationProps)

export default defineComponent({
  name: 'Notification',
  props: notificationProps,
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef, mergedThemeRef } = inject(
      notificationProviderInjectionKey
    )!
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      showAvatar: computed(() => {
        return props.avatar || props.type !== 'default'
      }),
      handleCloseClick () {
        props.onClose()
      },
      cssVars: computed(() => {
        const { type } = props
        const {
          self: {
            color,
            textColor,
            closeColor,
            closeColorHover,
            closeColorPressed,
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
            [createKey('iconColor', type)]: iconColor
          },
          common: {
            cubicBezierEaseOut,
            cubicBezierEaseIn,
            cubicBezierEaseInOut
          }
        } = mergedThemeRef.value
        const { left, right, top, bottom } = getPadding(padding)
        return {
          '--color': color,
          '--font-size': fontSize,
          '--text-color': textColor,
          '--description-text-color': descriptionTextColor,
          '--action-text-color': actionTextColor,
          '--title-text-color': headerTextColor,
          '--title-font-weight': headerFontWeight,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--bezier-ease-in': cubicBezierEaseIn,
          '--border-radius': borderRadius,
          '--box-shadow': boxShadow,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--line-height': lineHeight,
          '--icon-color': iconColor,
          '--close-margin': closeMargin,
          '--close-size': closeSize,
          '--width': width,
          '--padding-left': left,
          '--padding-right': right,
          '--padding-top': top,
          '--padding-bottom': bottom
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-notification`,
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
              <Render render={this.avatar} />
            ) : this.type !== 'default' ? (
              <NBaseIcon clsPrefix={mergedClsPrefix}>
                {{ default: () => iconMap[this.type] }}
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
              <Render render={this.title} />
            </div>
          ) : null}
          {this.description ? (
            <div class={`${mergedClsPrefix}-notification-main__description`}>
              <Render render={this.description} />
            </div>
          ) : null}
          {this.content ? (
            <pre class={`${mergedClsPrefix}-notification-main__content`}>
              <Render render={this.content} />
            </pre>
          ) : null}
          {this.meta || this.action ? (
            <div class={`${mergedClsPrefix}-notification-main-footer`}>
              {this.meta ? (
                <div
                  class={`${mergedClsPrefix}-notification-main-footer__meta`}
                >
                  <Render render={this.meta} />
                </div>
              ) : null}
              {this.action ? (
                <div
                  class={`${mergedClsPrefix}-notification-main-footer__action`}
                >
                  <Render render={this.action} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
