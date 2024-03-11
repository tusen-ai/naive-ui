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
  NDialogEnvironment,
  type exposedDialogEnvProps
} from './DialogEnvironment'
import {
  dialogApiInjectionKey,
  dialogProviderInjectionKey,
  dialogReactiveListInjectionKey
} from './context'

export type DialogOptions = Mutable<
Omit<
Partial<ExtractPropTypes<typeof exposedDialogEnvProps>>,
'internalStyle'
> & {
  class?: any
  style?: string | CSSProperties
}
>

export type DialogReactive = {
  readonly key: string
  readonly destroy: () => void
} & DialogOptions

// FIXME
// If style is used as CSSProperties, typescript 4.4.2 will throw tons of errors
// Fxxx
type TypeSafeDialogReactive = DialogReactive & {
  class?: any
  style?: any
}

export interface DialogApiInjection {
  destroyAll: () => void
  create: (options: DialogOptions) => DialogReactive
  success: (options: DialogOptions) => DialogReactive
  warning: (options: DialogOptions) => DialogReactive
  error: (options: DialogOptions) => DialogReactive
  info: (options: DialogOptions) => DialogReactive
}

export interface DialogProviderInjection {
  clickedRef: Ref<boolean>
  clickedPositionRef: Ref<{ x: number, y: number } | null>
}

export type DialogReactiveListInjection = Ref<DialogReactive[]>

interface DialogInst {
  hide: () => void
}

export type DialogProviderInst = DialogApiInjection

export const dialogProviderProps = {
  injectionKey: String,
  to: [String, Object] as PropType<string | HTMLElement>
}

export type DialogProviderProps = ExtractPublicPropTypes<
  typeof dialogProviderProps
>

export const NDialogProvider = defineComponent({
  name: 'DialogProvider',
  props: dialogProviderProps,
  setup () {
    const dialogListRef = ref<TypeSafeDialogReactive[]>([])
    const dialogInstRefs: Record<string, DialogInst | undefined> = {}
    function create (options: DialogOptions = {}): DialogReactive {
      const key = createId()
      const dialogReactive = reactive({
        ...options,
        key,
        destroy: () => {
          dialogInstRefs[`n-dialog-${key}`]?.hide()
        }
      })
      dialogListRef.value.push(dialogReactive)
      return dialogReactive
    }
    const typedApi = (
      ['info', 'success', 'warning', 'error'] as Array<
      'info' | 'success' | 'warning' | 'error'
      >
    ).map((type) => (options: DialogOptions): DialogReactive => {
      return create({ ...options, type })
    })

    function handleAfterLeave (key: string): void {
      const { value: dialogList } = dialogListRef
      dialogList.splice(
        dialogList.findIndex((dialog) => dialog.key === key),
        1
      )
    }

    function destroyAll (): void {
      Object.values(dialogInstRefs).forEach((dialogInstRef) => {
        dialogInstRef?.hide()
      })
    }

    const api = {
      create,
      destroyAll,
      info: typedApi[0],
      success: typedApi[1],
      warning: typedApi[2],
      error: typedApi[3]
    }
    provide(dialogApiInjectionKey, api)
    provide(dialogProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickedPositionRef: useClickPosition()
    })
    provide(dialogReactiveListInjectionKey, dialogListRef)
    return {
      ...api,
      dialogList: dialogListRef,
      dialogInstRefs,
      handleAfterLeave
    }
  },
  render () {
    return h(Fragment, null, [
      this.dialogList.map((dialog) =>
        h(
          NDialogEnvironment,
          omit(dialog, ['destroy', 'style'], {
            internalStyle: dialog.style,
            to: this.to,
            ref: ((inst: DialogInst | null) => {
              if (inst === null) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.dialogInstRefs[`n-dialog-${dialog.key}`]
              } else {
                this.dialogInstRefs[`n-dialog-${dialog.key}`] = inst
              }
            }) as any,
            internalKey: dialog.key,
            onInternalAfterLeave: this.handleAfterLeave
          })
        )
      ),
      this.$slots.default?.()
    ])
  }
})
