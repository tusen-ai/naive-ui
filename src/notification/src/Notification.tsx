import {
  h,
  defineComponent,
  computed,
  inject,
  PropType,
  VNodeChild,
  CSSProperties
} from 'vue'
import { createKey, keysOf, render as Render } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { NotificationProviderInjection } from './NotificationProvider'

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
    const NNotificationProvider = inject<NotificationProviderInjection>(
      'NNotificationProvider'
    ) as NotificationProviderInjection
    return {
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
            [createKey('iconColor', type)]: iconColor
          },
          common: {
            cubicBezierEaseOut,
            cubicBezierEaseIn,
            cubicBezierEaseInOut
          }
        } = NNotificationProvider.mergedTheme
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
          '--icon-color': iconColor
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-notification',
          {
            'n-notification--closable': this.closable,
            'n-notification--show-avatar': this.showAvatar
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.showAvatar ? (
          <div class="n-notification__avatar">
            {this.avatar ? (
              <Render render={this.avatar} />
            ) : this.type !== 'default' ? (
              <NBaseIcon>{{ default: () => iconMap[this.type] }}</NBaseIcon>
            ) : null}
          </div>
        ) : null}
        {this.closable ? (
          <NBaseClose
            class="n-notification__close"
            onClick={this.handleCloseClick}
          />
        ) : null}
        <div ref="bodyRef" class="n-notification-main">
          {this.title ? (
            <div class="n-notification-main__header">
              <Render render={this.title} />
            </div>
          ) : null}
          {this.description ? (
            <div class="n-notification-main__description">
              <Render render={this.description} />
            </div>
          ) : null}
          {this.content ? (
            <pre class="n-notification-main__content">
              <Render render={this.content} />
            </pre>
          ) : null}

          {this.meta || this.action ? (
            <div class="n-notification-main-footer">
              {this.meta ? (
                <div class="n-notification-main-footer__meta">
                  <Render render={this.meta} />
                </div>
              ) : null}
              {this.action ? (
                <div class="n-notification-main-footer__action">
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
