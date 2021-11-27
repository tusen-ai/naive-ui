/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {
  Fragment,
  h,
  reactive,
  ref,
  Teleport,
  defineComponent,
  PropType,
  ExtractPropTypes,
  provide,
  InjectionKey,
  Ref,
  renderSlot
} from 'vue'
import { createId } from 'seemly'
import { useConfig, useTheme } from '../../_mixins'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { ExtractPublicPropTypes, omit, Mutable } from '../../_utils'
import { notificationLight, NotificationTheme } from '../styles'
import NotificationContainer from './NotificationContainer'
import NotificationEnvironment, {
  notificationEnvOptions
} from './NotificationEnvironment'
import style from './styles/index.cssr'

export type NotificationOptions = Partial<
ExtractPropTypes<typeof notificationEnvOptions>
>

export interface NotificationProviderInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<NotificationTheme>>
}

export const notificationProviderInjectionKey: InjectionKey<NotificationProviderInjection> =
  Symbol('notificationProvider')

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

export const notificationApiInjectionKey: InjectionKey<NotificationApiInjection> =
  Symbol('notificationApi')

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

const notificationProviderProps = {
  ...(useTheme.props as ThemeProps<NotificationTheme>),
  to: [String, Object] as PropType<string | HTMLElement>,
  scrollable: {
    type: Boolean,
    default: true
  },
  max: Number,
  placement: {
    type: String as PropType<
    'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    >,
    default: 'top-right'
  }
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
      (type) => {
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
      'Notification',
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
    provide(notificationApiInjectionKey, api)
    provide(notificationProviderInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef
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
    return (
      <>
        {renderSlot(this.$slots, 'default')}
        {this.notificationList.length ? (
          <Teleport to={this.to ?? 'body'}>
            <NotificationContainer
              scrollable={this.scrollable}
              placement={this.placement}
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
