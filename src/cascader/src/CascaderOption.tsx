import {
  type PropType,
  Transition,
  type VNode,
  computed,
  defineComponent,
  h,
  inject
} from 'vue'
import { useMemo } from 'vooks'
import { happensIn } from 'seemly'
import { NCheckbox } from '../../checkbox'
import { NBaseIcon, NBaseLoading } from '../../_internal'
import { CheckmarkIcon, ChevronRightIcon } from '../../_internal/icons'
import { type TmNode, cascaderInjectionKey } from './interface'

export default defineComponent({
  name: 'NCascaderOption',
  props: {
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup(props) {
    const {
      expandTriggerRef,
      remoteRef,
      multipleRef,
      mergedValueRef,
      checkedKeysRef,
      indeterminateKeysRef,
      hoverKeyPathRef,
      keyboardKeyRef,
      loadingKeySetRef,
      cascadeRef,
      mergedCheckStrategyRef,
      onLoadRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      labelFieldRef,
      showCheckboxRef,
      renderPrefixRef,
      renderSuffixRef,
      updateHoverKey,
      updateKeyboardKey,
      addLoadingKey,
      deleteLoadingKey,
      closeMenu,
      doCheck,
      doUncheck,
      renderLabelRef
    } = inject(cascaderInjectionKey)!
    const valueRef = computed(() => props.tmNode.key)
    const useHoverTriggerRef = computed(() => {
      const { value: expandTrigger } = expandTriggerRef
      const { value: remote } = remoteRef
      return !remote && expandTrigger === 'hover'
    })
    const mergedHandleMouseEnterRef = computed(() => {
      if (useHoverTriggerRef.value) {
        return handleMouseEnter
      }
      return undefined
    })
    const mergedHandleMouseMoveRef = computed(() => {
      if (useHoverTriggerRef.value) {
        return handleMouseMove
      }
      return undefined
    })
    const checkedRef = useMemo(() => {
      const { value: multiple } = multipleRef
      if (!multiple)
        return mergedValueRef.value === valueRef.value
      return checkedKeysRef.value.includes(valueRef.value)
    })
    const indeterminateRef = useMemo(() => {
      if (!multipleRef.value)
        return false
      return indeterminateKeysRef.value.includes(valueRef.value)
    })
    const hoverPendingRef = useMemo(() => {
      return hoverKeyPathRef.value.includes(valueRef.value)
    })
    const keyboardPendingRef = useMemo(() => {
      const { value: keyboardKey } = keyboardKeyRef
      if (keyboardKey === null)
        return false
      return keyboardKey === valueRef.value
    })
    const isLoadingRef = useMemo(() => {
      if (remoteRef.value) {
        return loadingKeySetRef.value.has(valueRef.value)
      }
      return false
    })
    const isLeafRef = computed(() => props.tmNode.isLeaf)
    const disabledRef = computed(() => props.tmNode.disabled)
    const labelRef = computed(
      () => (props.tmNode.rawNode as any)[labelFieldRef.value]
    )
    const isShallowLoadedRef = computed(() => {
      return props.tmNode.shallowLoaded
    })
    function handleClick(e: MouseEvent): void {
      if (disabledRef.value)
        return
      const { value: remote } = remoteRef
      const { value: loadingKeySet } = loadingKeySetRef
      const { value: onLoad } = onLoadRef
      const { value } = valueRef
      const { value: isLeaf } = isLeafRef
      const { value: isShallowLoaded } = isShallowLoadedRef
      if (!happensIn(e, 'checkbox')) {
        if (remote && !isShallowLoaded && !loadingKeySet.has(value) && onLoad) {
          addLoadingKey(value)
          onLoad(props.tmNode.rawNode)
            .then(() => {
              deleteLoadingKey(value)
            })
            .catch(() => {
              deleteLoadingKey(value)
            })
        }
        updateHoverKey(value)
        updateKeyboardKey(value)
      }
      if (isLeaf) {
        toggleCheckbox()
      }
    }
    function handleMouseEnter(): void {
      if (!useHoverTriggerRef.value || disabledRef.value)
        return
      const { value } = valueRef
      updateHoverKey(value)
      updateKeyboardKey(value)
    }
    function handleMouseMove(): void {
      if (!useHoverTriggerRef.value)
        return
      handleMouseEnter()
    }
    function handleCheckboxUpdateValue(): void {
      const { value: isLeaf } = isLeafRef
      if (!isLeaf)
        toggleCheckbox()
    }
    function toggleCheckbox(): void {
      const { value: multiple } = multipleRef
      const { value } = valueRef
      if (multiple) {
        if (indeterminateRef.value || checkedRef.value) {
          doUncheck(value)
        }
        else {
          doCheck(value)
        }
      }
      else {
        doCheck(value)
        closeMenu(true)
      }
    }
    return {
      checkStrategy: mergedCheckStrategyRef,
      multiple: multipleRef,
      cascade: cascadeRef,
      checked: checkedRef,
      indeterminate: indeterminateRef,
      hoverPending: hoverPendingRef,
      keyboardPending: keyboardPendingRef,
      isLoading: isLoadingRef,
      showCheckbox: showCheckboxRef,
      isLeaf: isLeafRef,
      disabled: disabledRef,
      label: labelRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      handleClick,
      handleCheckboxUpdateValue,
      mergedHandleMouseEnter: mergedHandleMouseEnterRef,
      mergedHandleMouseMove: mergedHandleMouseMoveRef,
      renderLabel: renderLabelRef,
      renderPrefix: renderPrefixRef,
      renderSuffix: renderSuffixRef
    }
  },
  render() {
    const {
      mergedClsPrefix,
      showCheckbox,
      renderLabel,
      renderPrefix,
      renderSuffix
    } = this

    let prefixNode: VNode | null = null
    if (showCheckbox || renderPrefix) {
      const originalNode = this.showCheckbox ? (
        <NCheckbox
          focusable={false}
          data-checkbox
          disabled={this.disabled}
          checked={this.checked}
          indeterminate={this.indeterminate}
          theme={this.mergedTheme.peers.Checkbox}
          themeOverrides={this.mergedTheme.peerOverrides.Checkbox}
          onUpdateChecked={this.handleCheckboxUpdateValue}
        />
      ) : null
      prefixNode = (
        <div class={`${mergedClsPrefix}-cascader-option__prefix`}>
          {renderPrefix
            ? renderPrefix({
              option: this.tmNode.rawNode,
              checked: this.checked,
              node: originalNode
            })
            : originalNode}
        </div>
      )
    }
    let suffixNode: VNode | null = null
    const originalSuffixChild = (
      <div class={`${mergedClsPrefix}-cascader-option-icon-placeholder`}>
        {!this.isLeaf ? (
          <NBaseLoading
            clsPrefix={mergedClsPrefix}
            scale={0.85}
            strokeWidth={24}
            show={this.isLoading}
            class={`${mergedClsPrefix}-cascader-option-icon`}
          >
            {{
              default: () => (
                <NBaseIcon
                  clsPrefix={mergedClsPrefix}
                  key="arrow"
                  class={`${mergedClsPrefix}-cascader-option-icon ${mergedClsPrefix}-cascader-option-icon--arrow`}
                >
                  {{
                    default: () => <ChevronRightIcon />
                  }}
                </NBaseIcon>
              )
            }}
          </NBaseLoading>
        ) : this.checkStrategy === 'child'
          && !(this.multiple && this.cascade) ? (
              <Transition name="fade-in-scale-up-transition">
                {{
                  default: () =>
                    this.checked ? (
                      <NBaseIcon
                        clsPrefix={mergedClsPrefix}
                        class={`${mergedClsPrefix}-cascader-option-icon ${mergedClsPrefix}-cascader-option-icon--checkmark`}
                      >
                        {{ default: () => <CheckmarkIcon /> }}
                      </NBaseIcon>
                    ) : null
                }}
              </Transition>
            ) : null}
      </div>
    )
    suffixNode = (
      <div class={`${mergedClsPrefix}-cascader-option__suffix`}>
        {renderSuffix
          ? renderSuffix({
            option: this.tmNode.rawNode,
            checked: this.checked,
            node: originalSuffixChild
          })
          : originalSuffixChild}
      </div>
    )
    return (
      <div
        class={[
          `${mergedClsPrefix}-cascader-option`,
          this.keyboardPending
          || (this.hoverPending
            && `${mergedClsPrefix}-cascader-option--pending`),
          this.disabled && `${mergedClsPrefix}-cascader-option--disabled`,
          this.showCheckbox && `${mergedClsPrefix}-cascader-option--show-prefix`
        ]}
        onMouseenter={this.mergedHandleMouseEnter}
        onMousemove={this.mergedHandleMouseMove}
        onClick={this.handleClick}
      >
        {prefixNode}
        <span class={`${mergedClsPrefix}-cascader-option__label`}>
          {renderLabel
            ? renderLabel(this.tmNode.rawNode, this.checked)
            : this.label}
        </span>
        {suffixNode}
      </div>
    )
  }
})
