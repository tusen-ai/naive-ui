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
import { createTreeMate } from 'treemate'
import { NInput } from '../../input'
import type { InputRef } from '../../input'
import type { InternalSelectMenuRef } from '../../_internal'
import { NInternalSelectMenu } from '../../_internal'
import { Caret } from 'textarea-caret-ts'
import { VBinder, VFollower, VTarget, FollowerRef } from 'vueuc'
import {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select'
import { call, useAdjustedTo, warn } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { useIsMounted, useMergedState } from 'vooks'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { mentionLight } from '../styles'
import type { MentionTheme } from '../styles'
import style from './styles/index.cssr'
import type { MentionOption } from './interface'
import type { Size as InputSize } from '../../input/src/interface'

export default defineComponent({
  name: 'Mention',
  props: {
    ...(useTheme.props as ThemeProps<MentionTheme>),
    autosize: [Boolean, Object] as PropType<
    boolean | { maxRows?: number, minRows?: number }
    >,
    options: {
      type: Array as PropType<MentionOption[]>,
      default: []
    },
    type: {
      type: String as PropType<'input' | 'textarea'>,
      default: 'input'
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
    to: [String, Object] as PropType<string | HTMLElement>,
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
    size: String as PropType<InputSize>,
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
  },
  setup (props) {
    const mergedTheme = useTheme(
      'Mention',
      'Mention',
      style,
      mentionLight,
      props
    )
    const formItem = useFormItem(props)
    const inputInstRef = ref<InputRef | null>(null)
    const cursorRef = ref<HTMLElement | null>(null)
    const followerRef = ref<FollowerRef | null>(null)
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
        return option.label.startsWith(pattern)
      })
    })
    const treeMateRef = computed(() => {
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(filteredOptionsRef.value, {
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
    function doUpdateShowMenu (show: boolean): void {
      if (props.disabled) return
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
      return props.type === 'input'
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
      } = Caret.getRelativePosition(inputEl)
      if (props.type === 'textarea') {
        cursorPos.top -= inputEl.scrollTop
      }
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
      void nextTick().then(() => {
        // dom (input value) is updated
        deriveShowMenu()
        syncCursor()
        // menu is ready, we can sync menu position now
        void nextTick().then(syncPosition)
      })
    }
    function syncAfterCursorMove (): void {
      setTimeout(() => {
        syncCursor()
        deriveShowMenu()
        void nextTick().then(syncPosition)
      }, 0)
    }
    function handleInputKeyDown (e: KeyboardEvent): void {
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        if (inputInstRef.value?.isCompositing) return
        syncAfterCursorMove()
      } else if (
        e.code === 'ArrowUp' ||
        e.code === 'ArrowDown' ||
        e.code === 'Enter'
      ) {
        if (inputInstRef.value?.isCompositing) return
        const { value: selectMenuInst } = selectMenuInstRef
        if (showMenuRef.value) {
          if (selectMenuInst) {
            e.preventDefault()
            if (e.code === 'ArrowUp') {
              selectMenuInst.prev()
            } else if (e.code === 'ArrowDown') {
              selectMenuInst.next()
            } else {
              // Enter
              const option = selectMenuInst.getPendingOption()
              if (option) {
                handleSelect(option)
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
    function handleInputBlur (e: FocusEvent): void {
      const { onBlur } = props
      onBlur?.(e)
      const { nTriggerFormBlur } = formItem
      nTriggerFormBlur()
      doUpdateShowMenu(false)
    }
    function handleSelect (option: SelectBaseOption): void {
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
      const { value } = option
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
      props.onSelect?.(option as MentionOption, cachedPrefix)
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
    return {
      ...useConfig(props),
      mergedSize: formItem.mergedSize,
      mergedTheme,
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
      cssVars: computed(() => {
        const {
          self: { menuBoxShadow }
        } = mergedTheme.value
        return {
          '--menu-box-shadow': menuBoxShadow
        }
      })
    }
  },
  render () {
    return (
      <div class="n-mention" style={{ position: 'relative' }}>
        <NInput
          size={this.mergedSize}
          autosize={this.autosize}
          type={this.type}
          ref="inputInstRef"
          placeholder={this.placeholder}
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
                    return <div style={style} ref="cursorRef"></div>
                  }
                }}
              </VTarget>,
              <VFollower
                ref="followerRef"
                placement="bottom-start"
                show={this.showMenu}
                containerClass={this.namespace}
              >
                {{
                  default: () => (
                    <Transition
                      name="n-fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () =>
                          this.showMenu ? (
                            <NInternalSelectMenu
                              autoPending
                              ref="selectMenuInstRef"
                              class="n-mention-menu"
                              loading={this.loading}
                              treeMate={this.treeMate}
                              virtualScroll={false}
                              style={this.cssVars as CSSProperties}
                              onMenuToggleOption={this.handleSelect}
                            />
                          ) : null
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
