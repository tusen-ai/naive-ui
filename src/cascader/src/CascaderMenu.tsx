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
  withDirectives,
  renderSlot
} from 'vue'
import { FollowerPlacement } from 'vueuc'
import { clickoutside } from 'vdirs'
import { NEmpty } from '../../empty'
import { NBaseMenuMask } from '../../_internal'
import { MenuMaskRef } from '../../_internal/menu-mask'
import NCascaderSubmenu from './CascaderSubmenu'
import {
  cascaderInjectionKey,
  CascaderMenuExposedMethods,
  CascaderSubmenuInstance,
  MenuModel,
  Value
} from './interface'
import FocusDetector from '../../_internal/focus-detector'

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
    onKeyup: {
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
  setup (props) {
    const {
      localeRef,
      isMountedRef,
      mergedClsPrefixRef,
      syncCascaderMenuPosition,
      handleCascaderMenuClickOutside,
      mergedThemeRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const submenuInstRefs: CascaderSubmenuInstance[] = []
    const maskInstRef = ref<MenuMaskRef | null>(null)
    const selfElRef = ref<HTMLElement | null>(null)
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
    function showErrorMessage (label: string): void {
      const {
        value: { loadingRequiredMessage }
      } = localeRef
      maskInstRef.value?.showOnce(loadingRequiredMessage(label))
    }
    function handleClickOutside (e: MouseEvent): void {
      handleCascaderMenuClickOutside(e)
    }
    function handleFocusin (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (!selfEl.contains(e.relatedTarget as Node)) {
        props.onFocus(e)
      }
    }
    function handleFocusout (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (!selfEl.contains(e.relatedTarget as Node)) {
        props.onBlur(e)
      }
    }
    const exposedRef: CascaderMenuExposedMethods = {
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
      selfElRef,
      submenuInstRefs,
      maskInstRef,
      mergedTheme: mergedThemeRef,
      handleFocusin,
      handleFocusout,
      handleClickOutside,
      ...exposedRef
    }
  },
  render () {
    const { submenuInstRefs, mergedClsPrefix, $slots, mergedTheme } = this
    return (
      <Transition name="fade-in-scale-up-transition" appear={this.isMounted}>
        {{
          default: () => {
            if (!this.show) return null
            return withDirectives(
              <div
                tabindex="0"
                ref="selfElRef"
                class={`${mergedClsPrefix}-cascader-menu`}
                onMousedown={this.onMousedown}
                onFocusin={this.handleFocusin}
                onFocusout={this.handleFocusout}
                onKeyup={this.onKeyup}
                style={
                  {
                    '--n-col-count': this.menuModel.length
                  } as any
                }
              >
                {this.menuModel[0].length ? (
                  <div class={`${mergedClsPrefix}-cascader-submenu-wrapper`}>
                    {this.menuModel.map((submenuOptions, index) => (
                      <NCascaderSubmenu
                        ref={
                          ((instance: CascaderSubmenuInstance) => {
                            if (instance) {
                              submenuInstRefs[index] = instance
                            }
                          }) as any
                        }
                        key={index}
                        tmNodes={submenuOptions}
                        depth={index + 1}
                      />
                    ))}
                    <NBaseMenuMask
                      clsPrefix={mergedClsPrefix}
                      ref="maskInstRef"
                    />
                  </div>
                ) : (
                  <div class={`${mergedClsPrefix}-cascader-menu__empty`}>
                    {renderSlot($slots, 'empty', undefined, () => [
                      <NEmpty
                        theme={mergedTheme.peers.Empty}
                        themeOverrides={mergedTheme.peerOverrides.Empty}
                      />
                    ])}
                  </div>
                )}
                {$slots.action && (
                  <div
                    class={`${mergedClsPrefix}-cascader-menu-action`}
                    data-action
                  >
                    {{
                      default: $slots.action
                    }}
                  </div>
                )}
                <FocusDetector onFocus={this.onTabout} />
              </div>,
              [[clickoutside, this.handleClickOutside]]
            )
          }
        }}
      </Transition>
    )
  }
})
