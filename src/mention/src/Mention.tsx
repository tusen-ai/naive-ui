/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  defineComponent,
  h,
  PropType,
  ref,
  toRef,
  nextTick,
  computed,
  Transition,
  CSSProperties
} from 'vue'
import { createTreeMate, TreeNode } from 'treemate'
import {
  VBinder,
  VFollower,
  VTarget,
  FollowerInst,
  FollowerPlacement
} from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import type { FormValidationStatus } from '../../form/src/interface'
import { RenderLabel } from '../../_internal/select-menu/src/interface'
import type { Size as InputSize } from '../../input/src/interface'
import { NInput } from '../../input'
import type { InputInst } from '../../input'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select/src/interface'
import { NInternalSelectMenu } from '../../_internal'
import type { InternalSelectMenuRef } from '../../_internal'
import { call, useAdjustedTo, warn } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { mentionLight } from '../styles'
import type { MentionTheme } from '../styles'
import { getRelativePosition } from './utils'
import type { MentionOption } from './interface'
import style from './styles/index.cssr'

export const mentionProps = {
  ...(useTheme.props as ThemeProps<MentionTheme>),
  to: useAdjustedTo.propTo,
  autosize: [Boolean, Object] as PropType<
  boolean | { maxRows?: number, minRows?: number }
  >,
  options: {
    type: Array as PropType<MentionOption[]>,
    default: []
  },
  type: {
    type: String as PropType<'text' | 'textarea'>,
    default: 'text'
  },
  separator: {
    type: String,
    validator: (separator: string) => {
      if (separator.length !== 1) {
        warn('mention', "`separator`'s length must be 1.")
        return false
      }
      return true
    },
    default: ' '
  },
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  disabled: Boolean,
  value: String as PropType<string | null>,
  defaultValue: {
    type: String,
    default: ''
  },
  loading: Boolean,
  prefix: {
    type: [String, Array] as PropType<string | string[]>,
    default: '@'
  },
  placeholder: {
    type: String,
    default: ''
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  size: String as PropType<InputSize>,
  renderLabel: Function as PropType<RenderLabel>,
  status: String as PropType<FormValidationStatus>,
  'onUpdate:show': [Array, Function] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateShow: [Array, Function] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  'onUpdate:value': [Array, Function] as PropType<
  MaybeArray<(value: string) => void>
  >,
  onUpdateValue: [Array, Function] as PropType<
  MaybeArray<(value: string) => void>
  >,
  onSearch: Function as PropType<(pattern: string, prefix: string) => void>,
  onSelect: Function as PropType<
  (option: MentionOption, prefix: string) => void
  >,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  onBlur: Function as PropType<(e: FocusEvent) => void>,
  // private
  internalDebug: Boolean
} as const

export type MentionProps = ExtractPublicPropTypes<typeof mentionProps>

export default defineComponent({
  name: 'Mention',
  props: mentionProps,
  setup (props) {
    const {
      namespaceRef,
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled
    } = useConfig(props)
    const themeRef = useTheme(
      'Mention',
      '-mention',
      style,
      mentionLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const inputInstRef = ref<InputInst | null>(null)
    const cursorRef = ref<HTMLElement | null>(null)
    const followerRef = ref<FollowerInst | null>(null)
    const partialPatternRef = ref<string>('')
    let cachedPrefix: string | null = null
    // cached pattern end is for partial pattern
    // for example @abc|def
    // end is after `c`
    let cachedPartialPatternStart: number | null = null
    let cachedPartialPatternEnd: number | null = null
    const filteredOptionsRef = computed(() => {
      const { value: pattern } = partialPatternRef
      return props.options.filter((option) => {
        if (!pattern) return true
        if (typeof option.label === 'string') {
          return option.label.startsWith(pattern)
        }
        if (typeof option.value === 'string') {
          return option.value.startsWith(pattern)
        }
        return false
      })
    })
    const treeMateRef = computed(() => {
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      // We need to cast filteredOptionsRef's type since the render function
      // is not compitable
      // MentionOption { value: string, render?: (value: string) => VNodeChild }
      // SelectOption { value: string | number, render?: (value: string | number) => VNodeChild }
      // The 2 types are not compatible since `render`s are not compatible
      // However we know it works...
      >(filteredOptionsRef.value as any, {
        getKey: (v) => {
          return (v as any).value
        }
      })
    })
    const selectMenuInstRef = ref<InternalSelectMenuRef | null>(null)
    const showMenuRef = ref(false)
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: { menuBoxShadow }
      } = themeRef.value
      return {
        '--n-menu-box-shadow': menuBoxShadow
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('mention', undefined, cssVarsRef, props)
      : undefined
    function doUpdateShowMenu (show: boolean): void {
      if (props.disabled) return
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, show)
      if (_onUpdateShow) call(_onUpdateShow, show)
      if (!show) {
        cachedPrefix = null
        cachedPartialPatternStart = null
        cachedPartialPatternEnd = null
      }
      showMenuRef.value = show
    }
    function doUpdateValue (value: string): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      if (_onUpdateValue) {
        call(_onUpdateValue, value)
      }
      if (onUpdateValue) {
        call(onUpdateValue, value)
      }
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledValueRef.value = value
    }
    function getInputEl (): HTMLInputElement | HTMLTextAreaElement {
      return props.type === 'text'
        ? inputInstRef.value!.inputElRef!
        : inputInstRef.value!.textareaElRef!
    }
    function deriveShowMenu (): void {
      const inputEl = getInputEl()
      if (document.activeElement !== inputEl) {
        doUpdateShowMenu(false)
        return
      }
      const { selectionEnd } = inputEl
      if (selectionEnd === null) {
        doUpdateShowMenu(false)
        return
      }
      const inputValue = inputEl.value
      const { separator } = props
      const { prefix } = props
      const prefixArray = typeof prefix === 'string' ? [prefix] : prefix
      for (let i = selectionEnd - 1; i >= 0; --i) {
        const char = inputValue[i]
        if (char === separator || char === '\n' || char === '\r') {
          doUpdateShowMenu(false)
          return
        }
        if (prefixArray.includes(char)) {
          const partialPattern = inputValue.slice(i + 1, selectionEnd)
          doUpdateShowMenu(true)
          props.onSearch?.(partialPattern, char)
          partialPatternRef.value = partialPattern
          cachedPrefix = char
          cachedPartialPatternStart = i + 1
          cachedPartialPatternEnd = selectionEnd
          return
        }
      }
      doUpdateShowMenu(false)
    }
    function syncCursor (): void {
      const { value: cursorAnchor } = cursorRef
      if (!cursorAnchor) return
      const inputEl = getInputEl()
      const cursorPos: {
        left: number
        top: number
        height: number
      } = getRelativePosition(inputEl)
      cursorPos.left += inputEl.parentElement!.offsetLeft
      cursorAnchor.style.left = `${cursorPos.left}px`
      cursorAnchor.style.top = `${cursorPos.top + cursorPos.height}px`
    }
    function syncPosition (): void {
      if (!showMenuRef.value) return
      followerRef.value?.syncPosition()
    }
    function handleInputUpdateValue (value: string): void {
      doUpdateValue(value)
      // Vue update is mirco task.
      // So DOM must have been done when sync start in marco task.
      // I can't use nextTick(), Chrome doesn't update scrollLeft of INPUT
      // element is immediatelly updated. The behavior is wired but that's what
      // happens.
      syncAfterCursorMove()
    }
    function syncAfterCursorMove (): void {
      setTimeout(() => {
        syncCursor()
        deriveShowMenu()
        void nextTick().then(syncPosition)
      }, 0)
    }
    function handleInputKeyDown (e: KeyboardEvent): void {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (inputInstRef.value?.isCompositing) return
        syncAfterCursorMove()
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'Enter'
      ) {
        if (inputInstRef.value?.isCompositing) return
        const { value: selectMenuInst } = selectMenuInstRef
        if (showMenuRef.value) {
          if (selectMenuInst) {
            e.preventDefault()
            if (e.key === 'ArrowUp') {
              selectMenuInst.prev()
            } else if (e.key === 'ArrowDown') {
              selectMenuInst.next()
            } else {
              // Enter
              const pendingOptionTmNode = selectMenuInst.getPendingTmNode()
              if (pendingOptionTmNode) {
                handleSelect(pendingOptionTmNode)
              } else {
                doUpdateShowMenu(false)
              }
            }
          }
        } else {
          syncAfterCursorMove()
        }
      }
    }
    function handleInputFocus (e: FocusEvent): void {
      const { onFocus } = props
      onFocus?.(e)
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
      syncAfterCursorMove()
    }
    function focus (): void {
      inputInstRef.value?.focus()
    }
    function blur (): void {
      inputInstRef.value?.blur()
    }
    function handleInputBlur (e: FocusEvent): void {
      const { onBlur } = props
      onBlur?.(e)
      const { nTriggerFormBlur } = formItem
      nTriggerFormBlur()
      doUpdateShowMenu(false)
    }
    function handleSelect (tmNode: TreeNode<SelectBaseOption>): void {
      if (
        cachedPrefix === null ||
        cachedPartialPatternStart === null ||
        cachedPartialPatternEnd === null
      ) {
        if (__DEV__) {
          warn(
            'mention',
            'Cache works unexpectly, this is probably a bug. Please create an issue.'
          )
        }
        return
      }
      const {
        rawNode: { value = '' }
      } = tmNode
      const inputEl = getInputEl()
      const inputValue = inputEl.value
      const { separator } = props
      const nextEndPart = inputValue.slice(cachedPartialPatternEnd)
      const alreadySeparated = nextEndPart.startsWith(separator)
      const nextMiddlePart = `${value}${alreadySeparated ? '' : separator}`
      doUpdateValue(
        inputValue.slice(0, cachedPartialPatternStart) +
          nextMiddlePart +
          nextEndPart
      )
      props.onSelect?.(tmNode.rawNode as MentionOption, cachedPrefix)
      const nextSelectionEnd =
        cachedPartialPatternStart +
        nextMiddlePart.length +
        (alreadySeparated ? 1 : 0)
      void nextTick().then(() => {
        // input value is updated
        inputEl.selectionStart = nextSelectionEnd
        inputEl.selectionEnd = nextSelectionEnd
        deriveShowMenu()
      })
    }
    function handleInputMouseDown (): void {
      if (!props.disabled) {
        syncAfterCursorMove()
      }
    }
    return {
      namespace: namespaceRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedSize: formItem.mergedSizeRef,
      mergedStatus: formItem.mergedStatusRef,
      mergedTheme: themeRef,
      treeMate: treeMateRef,
      selectMenuInstRef,
      inputInstRef,
      cursorRef,
      followerRef,
      showMenu: showMenuRef,
      adjustedTo: useAdjustedTo(props),
      isMounted: useIsMounted(),
      mergedValue: mergedValueRef,
      handleInputFocus,
      handleInputBlur,
      handleInputUpdateValue,
      handleInputKeyDown,
      handleSelect,
      handleInputMouseDown,
      focus,
      blur,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix, $slots } = this
    return (
      <div class={`${mergedClsPrefix}-mention`}>
        <NInput
          status={this.mergedStatus}
          themeOverrides={mergedTheme.peerOverrides.Input}
          theme={mergedTheme.peers.Input}
          size={this.mergedSize}
          autosize={this.autosize}
          type={this.type}
          ref="inputInstRef"
          placeholder={this.placeholder}
          onMousedown={this.handleInputMouseDown}
          onUpdateValue={this.handleInputUpdateValue}
          onKeydown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          bordered={this.mergedBordered}
          disabled={this.disabled}
          value={this.mergedValue}
        />
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => {
                    const style: CSSProperties = {
                      position: 'absolute',
                      width: 0,
                      height: 0
                    }
                    if (__DEV__ && this.internalDebug) {
                      style.width = '1px'
                      style.height = '1px'
                      style.background = 'red'
                    }
                    return <div style={style} ref="cursorRef" />
                  }
                }}
              </VTarget>,
              <VFollower
                ref="followerRef"
                placement={this.placement}
                show={this.showMenu}
                containerClass={this.namespace}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () => {
                          const { mergedTheme, onRender } = this
                          onRender?.()
                          return this.showMenu ? (
                            <NInternalSelectMenu
                              clsPrefix={mergedClsPrefix}
                              theme={mergedTheme.peers.InternalSelectMenu}
                              themeOverrides={
                                mergedTheme.peerOverrides.InternalSelectMenu
                              }
                              autoPending
                              ref="selectMenuInstRef"
                              class={[
                                `${mergedClsPrefix}-mention-menu`,
                                this.themeClass
                              ]}
                              loading={this.loading}
                              treeMate={this.treeMate}
                              virtualScroll={false}
                              style={this.cssVars as any}
                              onToggle={this.handleSelect}
                              renderLabel={this.renderLabel}
                            >
                              {$slots}
                            </NInternalSelectMenu>
                          ) : null
                        }
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
