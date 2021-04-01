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
  CascaderInjection,
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
    const NCascader = inject<CascaderInjection>(
      'NCascader'
    ) as CascaderInjection
    const submenuInstRefs: CascaderSubmenuInstance[] = []
    const maskInstRef = ref<MenuMaskRef | null>(null)
    watch(toRef(props, 'value'), () => {
      void nextTick(() => {
        NCascader.syncCascaderMenuPosition()
      })
    })
    watch(toRef(props, 'menuModel'), () => {
      void nextTick(() => {
        NCascader.syncCascaderMenuPosition()
      })
    })
    function handleMenuMouseDown (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
    }
    function showErrorMessage (label: string): void {
      const {
        locale: { loadingRequiredMessage }
      } = NCascader
      maskInstRef.value?.showOnce(loadingRequiredMessage(label))
    }
    function handleClickOutside (e: MouseEvent): void {
      NCascader.handleCascaderMenuClickOutside(e)
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
      NCascader,
      submenuInstRefs,
      maskInstRef,
      handleClickOutside,
      handleMenuMouseDown,
      ...exposedRef
    }
  },
  render () {
    const { NCascader, submenuInstRefs } = this
    return (
      <Transition
        name="n-fade-in-scale-up-transition"
        appear={NCascader.isMounted}
      >
        {{
          default: () =>
            this.show
              ? withDirectives(
                <div
                  class="n-cascader-menu"
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
                  <NBaseMenuMask ref="maskInstRef" />
                </div>,
                [[clickoutside, this.handleClickOutside]]
              )
              : null
        }}
      </Transition>
    )
  }
})
