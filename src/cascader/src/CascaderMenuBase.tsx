import type { PropType } from 'vue'
import type { MenuMaskRef } from '../../_internal/menu-mask'
import type {
  CascaderMenuBaseInst,
  CascaderSubmenuInstance,
  MenuModel
} from './interface'
import { defineComponent, h, inject, ref } from 'vue'
import { NBaseMenuMask } from '../../_internal'
import FocusDetector from '../../_internal/focus-detector'
import { resolveSlot, resolveWrappedSlot, useOnResize } from '../../_utils'
import { NEmpty } from '../../empty'
import NCascaderSubmenu from './CascaderSubmenu'
import { cascaderInjectionKey } from './interface'

export default defineComponent({
  name: 'NCascaderMenuBase',
  props: {
    menuModel: {
      type: Array as PropType<MenuModel>,
      required: true
    },
    mergedClsPrefix: {
      type: String,
      required: true
    },
    mergedTheme: {
      type: Object as PropType<any>,
      required: true
    },
    submenuInstRefs: {
      type: Array as PropType<CascaderSubmenuInstance[]>,
      required: true
    },
    onMousedown: {
      type: Function as PropType<(e: MouseEvent) => void>,
      required: true
    },
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
    onTabout: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const { localeRef, syncCascaderMenuPosition, getColumnStyleRef }
      = inject(cascaderInjectionKey)!
    const selfElRef = ref<HTMLElement | null>(null)
    function handleResize(): void {
      syncCascaderMenuPosition()
    }
    useOnResize(selfElRef, handleResize)
    function handleFocusin(e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl)
        return
      if (!selfEl.contains(e.relatedTarget as Node)) {
        props.onFocus(e)
      }
    }

    function handleFocusout(e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl)
        return
      if (!selfEl.contains(e.relatedTarget as Node)) {
        props.onBlur(e)
      }
    }

    const maskInstRef = ref<MenuMaskRef | null>(null)

    function showErrorMessage(label: string): void {
      const {
        value: { loadingRequiredMessage }
      } = localeRef
      maskInstRef.value?.showOnce(loadingRequiredMessage(label))
    }

    const exposedRef: CascaderMenuBaseInst = {
      showErrorMessage
    }

    return {
      handleFocusin,
      handleFocusout,
      getColumnStyle: getColumnStyleRef,
      ...exposedRef
    }
  },
  render() {
    const { submenuInstRefs, mergedClsPrefix, mergedTheme } = this
    return (
      <div
        tabindex="0"
        ref="selfElRef"
        class={`${mergedClsPrefix}-cascader-menu`}
        onMousedown={this.onMousedown}
        onFocusin={this.handleFocusin}
        onFocusout={this.handleFocusout}
        onKeydown={this.onKeydown}
      >
        {this.menuModel[0].length ? (
          <div class={`${mergedClsPrefix}-cascader-submenu-wrapper`}>
            {this.menuModel.map((submenuOptions, index) => (
              <NCascaderSubmenu
                style={this.getColumnStyle?.({ level: index })}
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
            <NBaseMenuMask clsPrefix={mergedClsPrefix} ref="maskInstRef" />
          </div>
        ) : (
          <div class={`${mergedClsPrefix}-cascader-menu__empty`}>
            {resolveSlot(this.$slots.empty, () => [
              <NEmpty
                theme={mergedTheme.peers.Empty}
                themeOverrides={mergedTheme.peerOverrides.Empty}
              />
            ])}
          </div>
        )}
        {resolveWrappedSlot(
          this.$slots.action,
          children =>
            children && (
              <div
                class={`${mergedClsPrefix}-cascader-menu-action`}
                data-action
              >
                {children}
              </div>
            )
        )}
        <FocusDetector onFocus={this.onTabout} />
      </div>
    )
  }
})
