import {
  h,
  computed,
  inject,
  toRef,
  defineComponent,
  PropType,
  Transition
} from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import { NBaseLoading, NBaseIcon } from '../../_internal'
import { ChevronRightIcon, CheckmarkIcon } from '../../_internal/icons'
import { CascaderInjection, TmNode } from './interface'

export default defineComponent({
  name: 'NCascaderOption',
  props: {
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup (props) {
    const NCascader = inject<CascaderInjection>(
      'NCascader'
    ) as CascaderInjection
    const valueRef = computed(() => props.tmNode.rawNode.value)
    const useHoverTriggerRef = computed(() => {
      const { expandTrigger, remote } = NCascader
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
      if (!NCascader.multiple) return NCascader.mergedValue === valueRef.value
      return NCascader.checkedKeys.includes(valueRef.value)
    })
    const indeterminateRef = useMemo(() => {
      if (!NCascader.multiple) return false
      return NCascader.indeterminateKeys.includes(valueRef.value)
    })
    const hoverPendingRef = useMemo(() => {
      return NCascader.hoverKeyPath.includes(valueRef.value)
    })
    const keyboardPendingRef = useMemo(() => {
      if (NCascader.keyboardKey === null) return false
      return NCascader.keyboardKey === valueRef.value
    })
    const isLoadingRef = useMemo(() => {
      if (NCascader.remote) {
        return NCascader.loadingKeySet.has(valueRef.value)
      }
      return false
    })
    const showCheckboxRef = computed(() => {
      if (NCascader.multiple && NCascader.cascade) return true
      if (!NCascader.leafOnly) return true
    })
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const isLeafRef = computed(() => props.tmNode.isLeaf)
    const disabledRef = computed(() => props.tmNode.disabled)
    const labelRef = computed(() => props.tmNode.rawNode.label)
    const isShallowLoadedRef = computed(() => {
      return props.tmNode.shallowLoaded
    })
    function handleClick (): void {
      if (disabledRef.value) return
      const {
        updateHoverKey,
        updateKeyboardKey,
        remote,
        loadingKeySet,
        addLoadingKey,
        deleteLoadingKey,
        onLoad
      } = NCascader
      const { value } = valueRef
      const { value: isLeaf } = isLeafRef
      const { value: isShallowLoaded } = isShallowLoadedRef
      if (remote && !isShallowLoaded && !loadingKeySet.has(value) && onLoad) {
        addLoadingKey(value)
        onLoad(rawNodeRef.value)
          .then(() => {
            deleteLoadingKey(value)
          })
          .catch(() => {
            deleteLoadingKey(value)
          })
      }
      updateHoverKey(value)
      updateKeyboardKey(value)
      if (isLeaf) {
        toggleCheckbox()
      }
    }
    function handleMouseEnter (): void {
      if (!useHoverTriggerRef.value || disabledRef.value) return
      const { updateHoverKey, updateKeyboardKey } = NCascader
      const { value } = valueRef
      updateHoverKey(value)
      updateKeyboardKey(value)
    }
    function handleMouseMove (): void {
      if (!useHoverTriggerRef.value) return
      handleMouseEnter()
    }
    function handleCheckboxUpdateValue (): void {
      const { value: isLeaf } = isLeafRef
      if (!isLeaf) toggleCheckbox()
    }
    function toggleCheckbox (): void {
      const { doCheck, doUncheck, closeMenu, multiple } = NCascader
      const { value } = valueRef
      if (multiple) {
        if (indeterminateRef.value || checkedRef.value) {
          doUncheck(value)
        } else {
          doCheck(value)
        }
      } else {
        doCheck(value)
        closeMenu()
      }
    }
    return {
      NCascader,
      leafOnly: toRef(NCascader, 'leafOnly'),
      multiple: toRef(NCascader, 'multiple'),
      cascade: toRef(NCascader, 'cascade'),
      checked: checkedRef,
      indeterminate: indeterminateRef,
      hoverPending: hoverPendingRef,
      keyboardPending: keyboardPendingRef,
      isLoading: isLoadingRef,
      showCheckbox: showCheckboxRef,
      isLeaf: isLeafRef,
      disabled: disabledRef,
      label: labelRef,
      handleClick,
      handleCheckboxUpdateValue,
      mergedHandleMouseEnter: mergedHandleMouseEnterRef,
      mergedHandleMouseMove: mergedHandleMouseMoveRef
    }
  },
  render () {
    const { NCascader } = this
    return (
      <div
        class={[
          'n-cascader-option',
          {
            'n-cascader-option--pending':
              this.keyboardPending || this.hoverPending,
            'n-cascader-option--disabled': this.disabled,
            'n-cascader-option--show-prefix': this.showCheckbox
          }
        ]}
        onMouseenter={this.mergedHandleMouseEnter}
        onMousemove={this.mergedHandleMouseMove}
        onClick={this.handleClick}
      >
        {this.showCheckbox ? (
          <div class="n-cascader-option__prefix">
            <NCheckbox
              disabled={this.disabled}
              checked={this.checked}
              indeterminate={this.indeterminate}
              theme={NCascader.mergedTheme.peers.Checkbox}
              themeOverrides={NCascader.mergedTheme.peerOverrides.Checkbox}
              onUpdateChecked={this.handleCheckboxUpdateValue}
            />
          </div>
        ) : null}
        <span class="n-cascader-option__label">{this.label}</span>
        <div class="n-cascader-option__suffix">
          <div class="n-cascader-option-icon-placeholder">
            {!this.isLeaf ? (
              <NBaseLoading
                scale={0.8}
                strokeWidth={20}
                show={this.isLoading}
                class="n-cascader-option-icon"
              >
                {{
                  default: () => (
                    <NBaseIcon
                      key="arrow"
                      class="n-cascader-option-icon n-cascader-option-icon--arrow"
                    >
                      {{
                        default: () => <ChevronRightIcon />
                      }}
                    </NBaseIcon>
                  )
                }}
              </NBaseLoading>
            ) : this.leafOnly && !(this.multiple && this.cascade) ? (
              <Transition name="n-fade-in-scale-up-transition">
                {{
                  default: () =>
                    this.checked ? (
                      <NBaseIcon class="n-cascader-option-icon n-cascader-option-icon--checkmark">
                        {{ default: () => <CheckmarkIcon /> }}
                      </NBaseIcon>
                    ) : null
                }}
              </Transition>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
})
