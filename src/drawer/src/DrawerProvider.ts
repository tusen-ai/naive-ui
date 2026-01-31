import type {
  CSSProperties,
  DefineComponent,
  ExtractPropTypes,
  PropType,
  Ref,
  VNodeChild
} from 'vue'
import type { ExtractPublicPropTypes, Mutable } from '../../_utils'
import type { drawerProps } from './Drawer'
import { createId } from 'seemly'
import { defineComponent, Fragment, h, provide, reactive, ref } from 'vue'
import { omit } from '../../_utils'
import {
  drawerApiInjectionKey,
  drawerProviderInjectionKey,
  drawerReactiveListInjectionKey
} from './context'
import { NDrawerEnvironment } from './DrawerEnvironment'

export type DrawerOptions = Mutable<
  Omit<Partial<ExtractPropTypes<typeof drawerProps>>, 'internalStyle'> & {
    class?: any
    style?: string | CSSProperties
    // DrawerContent props
    title?: string
    closable?: boolean
    headerClass?: string
    headerStyle?: string | CSSProperties
    footerClass?: string
    footerStyle?: string | CSSProperties
    bodyClass?: string
    bodyStyle?: string | CSSProperties
    bodyContentClass?: string
    bodyContentStyle?: string | CSSProperties
    // render function
    render?: () => VNodeChild
    footer?: () => VNodeChild
  }
>

export type DrawerReactive = {
  readonly key: string
  readonly destroy: () => void
} & DrawerOptions

// FIXME
// If style is used as CSSProperties, typescript 4.4.2 will throw tons of errors
type TypeSafeDrawerReactive = DrawerReactive & {
  class?: any
  style?: any
}

export interface DrawerApiInjection {
  destroyAll: () => void
  create: (options: DrawerOptions) => DrawerReactive
}

export interface DrawerProviderInjection {
  // Drawer doesn't need click position like Modal
  // This interface is kept for consistency
}

export type DrawerReactiveListInjection = Ref<DrawerReactive[]>

interface DrawerInst {
  hide: () => void
}

export type DrawerProviderInst = DrawerApiInjection

export const drawerProviderProps = {
  to: [String, Object] as PropType<string | HTMLElement>
}

export type DrawerProviderProps = ExtractPublicPropTypes<
  typeof drawerProviderProps
>

export const NDrawerProvider: DefineComponent<{ to?: string | HTMLElement }>
  = defineComponent({
    name: 'DrawerProvider',
    props: drawerProviderProps,
    setup() {
      const drawerListRef = ref<TypeSafeDrawerReactive[]>([])
      const drawerInstRefs: Record<string, DrawerInst | undefined> = {}
      function create(options: DrawerOptions = {}): DrawerReactive {
        const key = createId()
        const drawerReactive = reactive({
          ...options,
          key,
          destroy: () => {
            drawerInstRefs[`n-drawer-${key}`]?.hide()
          }
        })
        drawerListRef.value.push(drawerReactive)
        return drawerReactive
      }

      function handleAfterLeave(key: string): void {
        const { value: drawerList } = drawerListRef
        drawerList.splice(
          drawerList.findIndex(drawer => drawer.key === key),
          1
        )
      }

      function destroyAll(): void {
        Object.values(drawerInstRefs).forEach((drawerInstRef) => {
          drawerInstRef?.hide()
        })
      }

      const api = {
        create,
        destroyAll
      }

      provide(drawerApiInjectionKey, api)
      provide(drawerProviderInjectionKey, {})
      provide(drawerReactiveListInjectionKey, drawerListRef)
      return {
        ...api,
        drawerList: drawerListRef,
        drawerInstRefs,
        handleAfterLeave
      }
    },
    render() {
      return h(Fragment, null, [
        this.drawerList.map(drawer =>
          h(
            NDrawerEnvironment,
            omit(drawer, ['destroy', 'render', 'footer'], {
              to: drawer.to ?? this.to,
              ref: ((inst: DrawerInst | null) => {
                if (inst === null) {
                  delete this.drawerInstRefs[`n-drawer-${drawer.key}`]
                }
                else {
                  this.drawerInstRefs[`n-drawer-${drawer.key}`] = inst
                }
              }) as any,
              internalKey: drawer.key,
              onInternalAfterLeave: this.handleAfterLeave,
              render: drawer.render,
              footer: drawer.footer
            })
          )
        ),
        this.$slots.default?.()
      ])
    }
  })
