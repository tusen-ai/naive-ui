/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {
  Fragment,
  h,
  reactive,
  ref,
  Teleport,
  defineComponent,
  type PropType,
  type ExtractPropTypes,
  provide,
  type Ref,
  type CSSProperties
} from 'vue'
import { createId } from 'seemly'
import { useConfig, useTheme } from '../../_mixins'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  omit,
  type Mutable,
  createInjectionKey
} from '../../_utils'
import { notificationLight, type NotificationTheme } from '../styles'
import { NotificationContainer } from './NotificationContainer'
import { NotificationEnvironment } from './NotificationEnvironment'
import type { NotificationOptions } from './NotificationEnvironment'
import { notificationProviderInjectionKey } from './context'
import style from './styles/index.cssr'

export type NotificationPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'

export interface NotificationProviderInjection {
  props: ExtractPropTypes<typeof notificationProviderProps>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<NotificationTheme>>
  wipTransitionCountRef: Ref<number>
}

type Create = (options: NotificationOptions) => NotificationReactive
type TypedCreate = (
  options: Omit<NotificationOptions, 'type'>
) => NotificationReactive

export interface NotificationApiInjection {
  create: Create
  info: TypedCreate
  success: TypedCreate
  warning: TypedCreate
  error: TypedCreate
  /** @deprecated */
  open: Create
  destroyAll: () => void
}

export type NotificationProviderInst = NotificationApiInjection

export const notificationApiInjectionKey =
  createInjectionKey<NotificationApiInjection>('n-notification-api')

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export type NotificationReactive = {
  readonly key: string
  readonly destroy: () => void
  /** @deprecated */
  readonly hide: () => void
  /** @deprecated */
  readonly deactivate: () => void
} & Mutable<NotificationOptions>

interface NotificationRef {
  hide: () => void
}

export const notificationProviderProps = {
  ...(useTheme.props as ThemeProps<NotificationTheme>),
  containerClass: String,
  containerStyle: [String, Object] as PropType<string | CSSProperties>,
  to: [String, Object] as PropType<string | HTMLElement>,
  scrollable: {
    type: Boolean,
    default: true
  },
  max: Number,
  placement: {
    type: String as PropType<NotificationPlacement>,
    default: 'top-right'
  },
  keepAliveOnHover: Boolean
}

export type NotificationProviderProps = ExtractPublicPropTypes<
  typeof notificationProviderProps
>

export default defineComponent({
  name: 'NotificationProvider',
  props: notificationProviderProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const notificationListRef = ref<NotificationReactive[]>([])
    const notificationRefs: Record<string, NotificationRef> = {}
    const leavingKeySet = new Set<string>()
    function create (options: NotificationOptions): NotificationReactive {
      const key = createId()
      const destroy = (): void => {
        leavingKeySet.add(key)
        // If you push n + 1 message when max is n, notificationRefs[key] maybe not be set
        if (notificationRefs[key]) {
          notificationRefs[key].hide()
        }
      }
      const notificationReactive = reactive({
        ...options,
        key,
        destroy,
        hide: destroy,
        deactivate: destroy
      })
      const { max } = props
      if (max && notificationListRef.value.length - leavingKeySet.size >= max) {
        let someoneMountedRemoved = false
        let index = 0
        for (const notification of notificationListRef.value) {
          if (!leavingKeySet.has(notification.key)) {
            if (notificationRefs[notification.key]) {
              notification.destroy()
              someoneMountedRemoved = true
            }
            break
          }
          index++
        }
        if (!someoneMountedRemoved) {
          notificationListRef.value.splice(index, 1)
        }
      }
      notificationListRef.value.push(notificationReactive)
      return notificationReactive
    }
    const apis = (['info', 'success', 'warning', 'error'] as const).map(
      (type: NotificationType) => {
        return (options: Omit<NotificationOptions, 'type'>) =>
          create({ ...options, type })
      }
    )
    function handleAfterLeave (key: string): void {
      leavingKeySet.delete(key)
      notificationListRef.value.splice(
        notificationListRef.value.findIndex(
          (notification) => notification.key === key
        ),
        1
      )
    }
    const themeRef = useTheme(
      'Notification',
      '-notification',
      style,
      notificationLight,
      props,
      mergedClsPrefixRef
    )
    const api = {
      create,
      info: apis[0],
      success: apis[1],
      warning: apis[2],
      error: apis[3],
      open,
      destroyAll
    }
    const wipTransitionCountRef = ref(0)
    provide(notificationApiInjectionKey, api)
    provide(notificationProviderInjectionKey, {
      props,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      wipTransitionCountRef
    })
    // deprecated
    function open (options: NotificationOptions): NotificationReactive {
      return create(options)
    }
    function destroyAll (): void {
      Object.values(notificationListRef.value).forEach((notification) => {
        notification.hide()
      })
    }
    return Object.assign(
      {
        mergedClsPrefix: mergedClsPrefixRef,
        notificationList: notificationListRef,
        notificationRefs,
        handleAfterLeave
      },
      api
    )
  },
  render () {
    const { placement } = this
    return (
      <>
        {this.$slots.default?.()}
        {this.notificationList.length ? (
          <Teleport to={this.to ?? 'body'}>
            <NotificationContainer
              class={this.containerClass}
              style={this.containerStyle}
              scrollable={
                this.scrollable && placement !== 'top' && placement !== 'bottom'
              }
              placement={placement}
            >
              {{
                default: () => {
                  return this.notificationList.map((notification) => {
                    return (
                      <NotificationEnvironment
                        ref={
                          ((inst: NotificationRef) => {
                            const refKey = notification.key
                            if (inst === null) {
                              delete this.notificationRefs[refKey]
                            } else this.notificationRefs[refKey] = inst
                          }) as any
                        }
                        {...omit(notification, [
                          'destroy',
                          'hide',
                          'deactivate'
                        ])}
                        internalKey={notification.key}
                        onInternalAfterLeave={this.handleAfterLeave}
                        keepAliveOnHover={
                          notification.keepAliveOnHover === undefined
                            ? this.keepAliveOnHover
                            : notification.keepAliveOnHover
                        }
                      />
                    )
                  })
                }
              }}
            </NotificationContainer>
          </Teleport>
        ) : null}
      </>
    )
  }
})
