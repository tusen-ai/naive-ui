import type { CSSProperties, ExtractPropTypes, PropType, Ref } from 'vue'
import type { ExtractPublicPropTypes, Mutable } from '../../_utils'
import type { exposedDialogEnvProps } from './DialogEnvironment'
import { createId } from 'seemly'
import { useClicked, useClickPosition } from 'vooks'
import { defineComponent, Fragment, h, provide, reactive, ref } from 'vue'
import { omit } from '../../_utils'
import {
  dialogApiInjectionKey,
  dialogProviderInjectionKey,
  dialogReactiveListInjectionKey
} from './context'
import { NDialogEnvironment } from './DialogEnvironment'

type ExposedDialogEnvPropTypes = ExtractPropTypes<typeof exposedDialogEnvProps>

export interface DialogOptions extends Mutable<
  Omit<Partial<ExposedDialogEnvPropTypes>, 'internalStyle'> & {
    class?: any
    style?: string | CSSProperties
  }
> {}

export interface DialogReactive extends DialogOptions {
  readonly key: string
  readonly destroy: () => void
}

// FIXME
// If style is used as CSSProperties, typescript 4.4.2 will throw tons of errors
// Fxxx
interface TypeSafeDialogReactive extends DialogReactive {
  class?: any
  style?: any
}

export interface DialogApiInjection {
  destroyAll: () => void
  create: (options: DialogOptions) => DialogReactive
  default: (options: DialogOptions) => DialogReactive
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

interface DialogProviderSetup extends DialogApiInjection {
  dialogList: Ref<TypeSafeDialogReactive[]>
  dialogInstRefs: Record<string, DialogInst | undefined>
  handleAfterLeave: (key: string) => void
}

export const NDialogProvider = defineComponent({
  name: 'DialogProvider',
  props: dialogProviderProps,
  setup(): DialogProviderSetup {
    const dialogListRef = ref<TypeSafeDialogReactive[]>([])
    const dialogInstRefs: Record<string, DialogInst | undefined> = {}
    function create(options: DialogOptions = {}): DialogReactive {
      const key = createId()
      const dialogReactive = reactive({
        ...options,
        key,
        destroy: () => {
          dialogInstRefs[`n-dialog-${key}`]?.hide()
        }
      }) as DialogReactive
      dialogListRef.value.push(dialogReactive)
      return dialogReactive
    }
    const typedApi = (
      ['default', 'info', 'success', 'warning', 'error'] as Array<
        'default' | 'info' | 'success' | 'warning' | 'error'
      >
    ).map(type => (options: DialogOptions): DialogReactive => {
      return create({ ...options, type })
    })

    function handleAfterLeave(key: string): void {
      const { value: dialogList } = dialogListRef
      dialogList.splice(
        dialogList.findIndex(dialog => dialog.key === key),
        1
      )
    }

    function destroyAll(): void {
      Object.values(dialogInstRefs).forEach((dialogInstRef) => {
        dialogInstRef?.hide()
      })
    }

    const api: DialogApiInjection = {
      create,
      destroyAll,
      default: typedApi[0],
      info: typedApi[1],
      success: typedApi[2],
      warning: typedApi[3],
      error: typedApi[4]
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
  render() {
    return h(Fragment, null, [
      this.dialogList.map(dialog =>
        h(
          NDialogEnvironment,
          omit(dialog, ['destroy', 'style'], {
            internalStyle: dialog.style,
            to: this.to,
            ref: ((inst: DialogInst | null) => {
              if (inst === null) {
                delete this.dialogInstRefs[`n-dialog-${dialog.key}`]
              }
              else {
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
