import {
  defineComponent,
  Fragment,
  ref,
  h,
  type ExtractPropTypes,
  provide,
  type PropType,
  reactive,
  type Ref,
  type CSSProperties
} from 'vue'
import { createId } from 'seemly'
import { useClicked, useClickPosition } from 'vooks'
import { omit } from '../../_utils'
import type { ExtractPublicPropTypes, Mutable } from '../../_utils'
import {
  NModalEnvironment,
  type exposedModalEnvProps
} from './ModalEnvironment'
import {
  modalApiInjectionKey,
  modalProviderInjectionKey,
  modalReactiveListInjectionKey
} from './context'

export type ModalOptions = Mutable<
Omit<
Partial<ExtractPropTypes<typeof exposedModalEnvProps>>,
'internalStyle'
> & {
  class?: any
  style?: string | CSSProperties
}
>

export type ModalReactive = {
  readonly key: string
  readonly destroy: () => void
} & ModalOptions

// FIXME
// If style is used as CSSProperties, typescript 4.4.2 will throw tons of errors
// Fxxx
type TypeSafeModalReactive = ModalReactive & {
  class?: any
  style?: any
}

export interface ModalApiInjection {
  destroyAll: () => void
  create: (options: ModalOptions) => ModalReactive
}

export interface ModalProviderInjection {
  clickedRef: Ref<boolean>
  clickPositionRef: Ref<{ x: number, y: number } | null>
}

export type ModalReactiveListInjection = Ref<ModalReactive[]>

interface ModalInst {
  hide: () => void
}

export type ModalProviderInst = ModalApiInjection

export const modalProviderProps = {
  injectionKey: String,
  to: [String, Object] as PropType<string | HTMLElement>
}

export type ModalProviderProps = ExtractPublicPropTypes<
  typeof modalProviderProps
>

export const NModalProvider = defineComponent({
  name: 'ModalProvider',
  props: modalProviderProps,
  setup () {
    const modalListRef = ref<TypeSafeModalReactive[]>([])
    const modalInstRefs: Record<string, ModalInst> = {}
    function create (options: ModalOptions = {}): ModalReactive {
      const key = createId()
      const modalReactive = reactive({
        ...options,
        key,
        destroy: () => {
          modalInstRefs[`n-modal-${key}`].hide()
        }
      })
      modalListRef.value.push(modalReactive)
      return modalReactive
    }

    function handleAfterLeave (key: string): void {
      const { value: modalList } = modalListRef
      modalList.splice(
        modalList.findIndex((modal) => modal.key === key),
        1
      )
    }

    function destroyAll (): void {
      Object.values(modalInstRefs).forEach((modalInstRef) => {
        modalInstRef.hide()
      })
    }

    const api = {
      create,
      destroyAll
    }

    provide(modalApiInjectionKey, api)
    provide(modalProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickPositionRef: useClickPosition()
    })
    provide(modalReactiveListInjectionKey, modalListRef)
    return {
      ...api,
      modalList: modalListRef,
      modalInstRefs,
      handleAfterLeave
    }
  },
  render () {
    return h(Fragment, null, [
      this.modalList.map((modal) =>
        h(
          NModalEnvironment,
          omit(modal, ['destroy', 'style'], {
            internalStyle: modal.style,
            to: this.to,
            ref: ((inst: ModalInst | null) => {
              if (inst === null) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.modalInstRefs[`n-modal-${modal.key}`]
              } else {
                this.modalInstRefs[`n-modal-${modal.key}`] = inst
              }
            }) as any,
            internalKey: modal.key,
            onInternalAfterLeave: this.handleAfterLeave
          })
        )
      ),
      this.$slots.default?.()
    ])
  }
})
