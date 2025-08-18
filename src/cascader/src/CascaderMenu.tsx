import type { FollowerPlacement } from 'vueuc'
import type {
  CascaderMenuBaseInst,
  CascaderMenuExposedMethods,
  CascaderSubmenuInstance,
  MenuModel,
  Value
} from './interface'
import { clickoutside } from 'vdirs'
import {
  defineComponent,
  h,
  inject,
  type PropType,
  ref,
  Transition,
  withDirectives
} from 'vue'
import NCascaderMenuBase from './CascaderMenuBase'
import { cascaderInjectionKey } from './interface'

export default defineComponent({
  name: 'NCascaderMenu',
  props: {
    value: [String, Number, Array] as PropType<Value | null>,
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: 'bottom-start'
    },
    show: Boolean,
    menuModel: {
      type: Array as PropType<MenuModel>,
      required: true
    },
    loading: Boolean,
    onFocus: {
      type: Function as PropType<(e: FocusEvent) => void>,
      required: true
    },
    onBlur: {
      type: Function as PropType<(e: FocusEvent) => void>,
      required: true
    },
    onKeydown: {
      type: Function as PropType<(e: KeyboardEvent) => void>,
      required: true
    },
    onMousedown: {
      type: Function as PropType<(e: MouseEvent) => void>,
      required: true
    },
    onTabout: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup() {
    const {
      isMountedRef,
      mergedClsPrefixRef,
      handleCascaderMenuClickOutside,
      mergedThemeRef,
      getColumnStyleRef
    } = inject(cascaderInjectionKey)!

    function handleClickOutside(e: MouseEvent): void {
      handleCascaderMenuClickOutside(e)
    }

    const cascaderMenuBaseRef = ref<CascaderMenuBaseInst>()
    const showErrorMessage = (label: string) => {
      cascaderMenuBaseRef.value!.showErrorMessage(label)
    }

    function scroll(depth: number, index: number, elSize: number) {
      cascaderMenuBaseRef.value!.scroll(depth, index, elSize)
    }

    const exposedRef: CascaderMenuExposedMethods = {
      scroll,
      showErrorMessage
    }
    return {
      isMounted: isMountedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      getColumnStyle: getColumnStyleRef,
      handleClickOutside,
      cascaderMenuBaseRef,
      ...exposedRef
    }
  },
  render() {
    const { mergedClsPrefix, mergedTheme } = this
    return (
      <Transition name="fade-in-scale-up-transition" appear={this.isMounted}>
        {{
          default: () => {
            if (!this.show)
              return null
            return withDirectives(
              <NCascaderMenuBase
                ref="cascaderMenuBaseRef"
                mergedClsPrefix={mergedClsPrefix}
                mergedTheme={mergedTheme}
                menuModel={this.menuModel}
                onMousedown={this.onMousedown}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeydown={this.onKeydown}
                onTabout={this.onTabout}
              >
                {{
                  action: () => this.$slots.action?.(),
                  empty: () => this.$slots.empty?.()
                }}
              </NCascaderMenuBase>,
              [
                [
                  clickoutside,
                  this.handleClickOutside,
                  undefined as unknown as string,
                  { capture: true }
                ]
              ]
            )
          }
        }}
      </Transition>
    )
  }
})
