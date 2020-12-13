<template>
  <div
    class="n-cascader-option"
    :class="{
      'n-cascader-option--pending': keyboardPending || hoverPending,
      'n-cascader-option--disabled': disabled,
      'n-cascader-option--show-prefix': showCheckbox
    }"
    :onMouseEnter="mergedHandleMouseEnter"
    :onMouseMove="mergedHandleMouseMove"
    @click="handleClick"
  >
    <div v-if="showCheckbox" class="n-cascader-option__prefix">
      <n-checkbox
        :disabled="disabled"
        :checked="checked"
        :indeterminate="indeterminate"
        @click.stop="handleCheck"
      />
    </div>
    <span class="n-cascader-option__label">{{ label }}</span>
    <div class="n-cascader-option__suffix">
      <div class="n-cascader-option-icon-placeholder">
        <n-icon-switch-transition v-if="!isLeaf">
          <n-base-loading
            v-if="isLoading"
            key="loading"
            class="n-cascader-option-icon"
            :theme="NCascader.mergedTheme"
          />
          <n-icon
            v-else
            key="arrow"
            class="n-cascader-option-icon n-cascader-option-icon--arrow"
          >
            <chevron-right-icon />
          </n-icon>
        </n-icon-switch-transition>
        <transition
          v-else-if="!multiple && leafOnly"
          name="n-fade-in-scale-up-transition"
        >
          <n-icon
            v-if="checked"
            class="n-cascader-option-icon n-cascader-option-icon--checkmark"
          >
            <checkmark-icon />
          </n-icon>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, toRef } from 'vue'
import { NCheckbox } from '../../checkbox'
import { NBaseLoading, NIconSwitchTransition } from '../../_base'
import { ChevronRightIcon, CheckmarkIcon } from '../../_base/icons'
import { useMemo } from 'vooks'

export default {
  name: 'NCascaderOption',
  components: {
    NCheckbox,
    NBaseLoading,
    NIconSwitchTransition,
    ChevronRightIcon,
    CheckmarkIcon
  },
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const NCascader = inject('NCascader')
    const valueRef = computed(() => props.tmNode.rawNode.value)
    return {
      NCascader,
      leafOnly: toRef(NCascader, 'leafOnly'),
      multiple: toRef(NCascader, 'multiple'),
      checked: useMemo(() => {
        if (!NCascader.multiple) return NCascader.value === valueRef.value
        return NCascader.checkedKeys.includes(valueRef.value)
      }),
      indeterminate: useMemo(() => {
        if (!NCascader.multiple) return false
        return NCascader.indeterminateKeys.includes(valueRef.value)
      }),
      hoverPending: useMemo(() => {
        return NCascader.hoverKeyPath.includes(valueRef.value)
      }),
      keyboardPending: useMemo(() => {
        if (NCascader.keyboardKey === null) return false
        return NCascader.keyboardKey === valueRef.value
      }),
      isLoading: useMemo(() => {
        if (NCascader.remote) {
          return NCascader.loadingKeySet.has(valueRef.value)
        }
        return false
      }),
      showCheckbox: computed(() => {
        if (NCascader.multiple) return true
        if (!NCascader.leafOnly) return true
      }),
      useHoverTrigger: computed(() => {
        const { expandTrigger, remote } = NCascader
        return !remote && expandTrigger === 'hover'
      }),
      rawNode: computed(() => props.tmNode.rawNode),
      isLeaf: computed(() => props.tmNode.isLeaf),
      disabled: computed(() => props.tmNode.disabled),
      label: computed(() => props.tmNode.rawNode.label),
      isShallowLoaded: computed(() => {
        return props.tmNode.isShallowLoaded
      }),
      value: valueRef,
      loading: false
    }
  },
  computed: {
    mergedHandleMouseEnter () {
      if (this.useHoverTrigger) {
        return this.handleMouseEnter
      }
      return null
    },
    mergedHandleMouseMove () {
      if (this.useHoverTrigger) {
        return this.handleMouseMove
      }
      return null
    }
  },
  methods: {
    handleClick (e) {
      if (this.disabled) return
      const {
        NCascader: {
          updateHoverKey,
          updateKeyboardKey,
          remote,
          loadingKeySet,
          addLoadingKey,
          deleteLoadingKey,
          onLoad
        },
        value,
        isLeaf,
        isShallowLoaded
      } = this
      if (remote && !isShallowLoaded && !loadingKeySet.has(value)) {
        addLoadingKey(value)
        onLoad(this.rawNode)
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
        this.handleCheck()
      }
    },
    handleMouseEnter (e) {
      if (!this.useHoverTrigger) return
      if (this.disabled) return
      const {
        NCascader: { updateHoverKey, updateKeyboardKey },
        value
      } = this
      updateHoverKey(value)
      updateKeyboardKey(value)
    },
    handleMouseMove (e) {
      if (!this.useHoverTrigger) return
      this.handleMouseEnter(e)
    },
    handleCheck () {
      const {
        multiple,
        value,
        NCascader: { doCheck, doUncheck, closeMenu }
      } = this
      if (multiple) {
        if (this.indeterminate || this.checked) {
          doUncheck(value)
        } else {
          doCheck(value)
        }
      } else {
        doCheck(value)
        closeMenu()
      }
    }
  }
}
</script>
