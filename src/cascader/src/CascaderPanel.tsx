import type { CheckStrategy } from 'treemate'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { CascaderTheme } from '../styles'
import type {
  CascaderOption,
  CascaderPanelInst,
  ExpandTrigger,
  OnLoad,
  OnUpdateValue,
  Value
} from './interface'
import { happensIn } from 'seemly'
import { useIsMounted } from 'vooks'
import {
  type CSSProperties,
  defineComponent,
  h,
  type HTMLAttributes,
  type PropType,
  provide,
  type SlotsType,
  toRef,
  type VNode,
  type VNodeChild
} from 'vue'
import { useTheme } from '../../_mixins'
import { markEventEffectPerformed } from '../../_utils'
import NCascaderMenuBase from './CascaderMenuBase'
import { useCascader } from './hooks/useCascader'
import { cascaderInjectionKey } from './interface'

export const cascaderPanelProps = {
  ...(useTheme.props as ThemeProps<CascaderTheme>),
  allowCheckingNotLoaded: Boolean,
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => []
  },
  value: [String, Number, Array] as PropType<Value | null>,
  defaultValue: {
    type: [String, Number, Array] as PropType<Value | null>,
    default: null
  },
  multiple: Boolean,
  size: String as PropType<'small' | 'medium' | 'large'>,
  disabledField: {
    type: String,
    default: 'disabled'
  },
  expandTrigger: {
    type: String as PropType<ExpandTrigger>,
    default: 'click'
  },
  remote: Boolean,
  onLoad: Function as PropType<OnLoad>,
  separator: {
    type: String,
    default: ' / '
  },
  cascade: {
    type: Boolean,
    default: true
  },
  leafOnly: Boolean,
  showPath: {
    type: Boolean,
    default: true
  },
  menuProps: Object as PropType<HTMLAttributes>,
  virtualScroll: {
    type: Boolean,
    default: true
  },
  checkStrategy: {
    type: String as PropType<CheckStrategy>,
    default: 'all'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  renderLabel: Function as PropType<
    (option: CascaderOption, checked: boolean) => VNodeChild
  >,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  getColumnStyle: Function as PropType<
    (detail: { level: number }) => string | CSSProperties
  >,
  renderPrefix: Function as PropType<
    (props: {
      option: CascaderOption
      checked: boolean
      node: VNode | null
    }) => VNodeChild
  >,
  renderSuffix: Function as PropType<
    (props: {
      option: CascaderOption
      checked: boolean
      node: VNode | null
    }) => VNodeChild
  >
} as const

export type CascaderPanelProps = ExtractPublicPropTypes<
  typeof cascaderPanelProps
>

export interface CascaderPanelSlots {
  action?: () => VNode[]
  arrow?: () => VNode[]
  empty?: () => VNode[]
  'not-found'?: () => VNode[]
}

export default defineComponent({
  name: 'CascaderPanel',
  props: cascaderPanelProps,
  slots: Object as SlotsType<CascaderPanelSlots>,
  setup(props, { slots }) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      themeRef,
      localeRef,
      optionHeightRef,
      mergedValueRef,
      mergedCheckStrategyRef,
      keyboardKeyRef,
      hoverKeyRef,
      loadingKeySetRef,
      addLoadingKey,
      deleteLoadingKey,
      treeMateRef,
      checkedKeysRef,
      indeterminateKeysRef,
      menuModelRef,
      hoverKeyPathRef,
      updateKeyboardKey,
      updateHoverKey,
      getOptionsByKeys,
      showCheckboxRef,
      selectedOptionsRef,
      selectedOptionRef,
      doUncheck,
      doCheck,
      cascaderMenuInstRef,
      move,
      cssVarsRef,
      themeClassHandle
    } = useCascader(props)

    // --- keyboard
    function handleKeydown(e: KeyboardEvent): void {
      if (happensIn(e, 'action'))
        return
      switch (e.key) {
        case 'Enter':
          if (keyboardKeyRef.value !== null) {
            if (
              checkedKeysRef.value.includes(keyboardKeyRef.value)
              || indeterminateKeysRef.value.includes(keyboardKeyRef.value)
            ) {
              doUncheck(keyboardKeyRef.value)
            }
            else {
              const { value: keyboardKey } = keyboardKeyRef
              doCheck(keyboardKey)
            }
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          move('prev')
          break
        case 'ArrowDown':
          e.preventDefault()
          move('next')
          break
        case 'ArrowLeft':
          e.preventDefault()
          move('parent')
          break
        case 'ArrowRight':
          e.preventDefault()
          move('child')
          break
        case 'Escape':
          markEventEffectPerformed(e)
      }
    }
    function handleMenuKeydown(e: KeyboardEvent): void {
      handleKeydown(e)
    }
    // --- search
    function handleMenuFocus(): void {}
    function handleMenuBlur(): void {}
    function handleMenuMousedown(): void {}
    // sync position
    function syncCascaderMenuPosition() {}
    function syncSelectMenuPosition() {}
    function closeMenu() {}
    function handleCascaderMenuClickOutside() {}
    function clearPattern() {}
    function handleSelectMenuClickOutside(): void {}
    function handleTriggerClick(): void {}
    function handleMenuTabout(): void {}

    provide(cascaderInjectionKey, {
      slots,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      mergedValueRef,
      checkedKeysRef,
      indeterminateKeysRef,
      hoverKeyPathRef,
      mergedCheckStrategyRef,
      showCheckboxRef,
      cascadeRef: toRef(props, 'cascade'),
      multipleRef: toRef(props, 'multiple'),
      syncCascaderMenuPosition,
      syncSelectMenuPosition,
      keyboardKeyRef,
      hoverKeyRef,
      localeRef,
      remoteRef: toRef(props, 'remote'),
      loadingKeySetRef,
      expandTriggerRef: toRef(props, 'expandTrigger'),
      isMountedRef: useIsMounted(),
      onLoadRef: toRef(props, 'onLoad'),
      virtualScrollRef: toRef(props, 'virtualScroll'),
      optionHeightRef,
      labelFieldRef: toRef(props, 'labelField'),
      renderLabelRef: toRef(props, 'renderLabel'),
      getColumnStyleRef: toRef(props, 'getColumnStyle'),
      renderPrefixRef: toRef(props, 'renderPrefix'),
      renderSuffixRef: toRef(props, 'renderSuffix'),
      updateKeyboardKey,
      updateHoverKey,
      addLoadingKey,
      deleteLoadingKey,
      doCheck,
      doUncheck,
      closeMenu,
      handleSelectMenuClickOutside,
      handleCascaderMenuClickOutside,
      clearPattern
    })
    const exposedMethods: CascaderPanelInst = {
      getCheckedData: () => {
        if (showCheckboxRef.value) {
          const checkedKeys = checkedKeysRef.value
          return {
            keys: checkedKeys,
            options: getOptionsByKeys(checkedKeys)
          }
        }
        return {
          keys: [],
          options: []
        }
      },
      getIndeterminateData: () => {
        if (showCheckboxRef.value) {
          const indeterminateKeys = indeterminateKeysRef.value
          return {
            keys: indeterminateKeys,
            options: getOptionsByKeys(indeterminateKeys)
          }
        }
        return {
          keys: [],
          options: []
        }
      }
    }

    return {
      ...exposedMethods,
      cascaderMenuInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      treeMate: treeMateRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      menuModel: menuModelRef,
      handleMenuTabout,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuKeydown,
      handleMenuMousedown,
      handleTriggerClick,
      handleKeydown,
      optionHeight: optionHeightRef,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix, menuProps, mergedTheme } = this
    this.onRender?.()
    return (
      <div class={`${mergedClsPrefix}-cascader`}>
        <NCascaderMenuBase
          ref="cascaderMenuInstRef"
          class={[this.themeClass, menuProps?.class]}
          mergedClsPrefix={mergedClsPrefix}
          mergedTheme={mergedTheme}
          menuModel={this.menuModel}
          style={[this.cssVars as CSSProperties, menuProps?.style]}
          onFocus={this.handleMenuFocus}
          onBlur={this.handleMenuBlur}
          onKeydown={this.handleMenuKeydown}
          onMousedown={this.handleMenuMousedown}
          onTabout={this.handleMenuTabout}
        >
          {{
            action: () => this.$slots.action?.(),
            empty: () => this.$slots.empty?.()
          }}
        </NCascaderMenuBase>
      </div>
    )
  }
})
