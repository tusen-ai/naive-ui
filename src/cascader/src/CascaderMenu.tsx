import {
  h,
  ref,
  defineComponent,
  PropType,
  watch,
  toRef,
  inject,
  nextTick,
  Transition,
  withDirectives
} from 'vue'
import { FollowerPlacement } from 'vueuc'
import { clickoutside } from 'vdirs'
import { NBaseMenuMask } from '../../_internal'
import { MenuMaskRef } from '../../_internal/menu-mask'
import NCascaderSubmenu from './CascaderSubmenu'
import {
  cascaderInjectionKey,
  CascaderMenuInstance,
  CascaderSubmenuInstance,
  MenuModel,
  Value
} from './interface'

export default defineComponent({
  name: 'NCascaderMenu',
  props: {
    value: [String, Number, Array] as PropType<Value | null>,
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: 'bottom-start'
    },
    show: {
      type: Boolean,
      default: false
    },
    menuModel: {
      type: Array as PropType<MenuModel>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const {
      localeRef,
      isMountedRef,
      mergedClsPrefixRef,
      syncCascaderMenuPosition,
      handleCascaderMenuClickOutside
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const submenuInstRefs: CascaderSubmenuInstance[] = []
    const maskInstRef = ref<MenuMaskRef | null>(null)
    watch(toRef(props, 'value'), () => {
      void nextTick(() => {
        syncCascaderMenuPosition()
      })
    })
    watch(toRef(props, 'menuModel'), () => {
      void nextTick(() => {
        syncCascaderMenuPosition()
      })
    })
    function handleMenuMouseDown (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
    }
    function showErrorMessage (label: string): void {
      const {
        value: { loadingRequiredMessage }
      } = localeRef
      maskInstRef.value?.showOnce(loadingRequiredMessage(label))
    }
    function handleClickOutside (e: MouseEvent): void {
      handleCascaderMenuClickOutside(e)
    }
    const exposedRef: CascaderMenuInstance = {
      scroll (depth: number, index: number, elSize: number) {
        const submenuInst = submenuInstRefs[depth]
        if (submenuInst) {
          submenuInst.scroll(index, elSize)
        }
      },
      showErrorMessage
    }
    return {
      isMounted: isMountedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      submenuInstRefs,
      maskInstRef,
      handleClickOutside,
      handleMenuMouseDown,
      ...exposedRef
    }
  },
  render () {
    const { submenuInstRefs } = this
    return (
      <Transition name="n-fade-in-scale-up-transition" appear={this.isMounted}>
        {{
          default: () =>
            this.show
              ? withDirectives(
                <div
                  class={`${this.mergedClsPrefix}-cascader-menu`}
                  onMousedown={this.handleMenuMouseDown}
                >
                  {this.menuModel.map((submenuOptions, index) => {
                    return (
                      <NCascaderSubmenu
                        ref={
                          ((instance: CascaderSubmenuInstance) => {
                            if (instance) submenuInstRefs[index] = instance
                          }) as any
                        }
                        key={index}
                        tmNodes={submenuOptions}
                        depth={index + 1}
                      />
                    )
                  })}
                  <NBaseMenuMask
                    clsPrefix={this.mergedClsPrefix}
                    ref="maskInstRef"
                  />
                </div>,
                [[clickoutside, this.handleClickOutside]]
              )
              : null
        }}
      </Transition>
    )
  }
})
