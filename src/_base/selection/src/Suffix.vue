<template>
  <n-base-loading
    :theme="theme"
    class="n-base-selection__mark"
    :stroke-width="20"
    :scale="0.8"
    :show="loading"
  >
    <n-base-clear-button
      v-if="showArrow"
      :theme="theme"
      :show="showClear"
      @clear="onClear"
    >
      <n-icon depth="4">
        <chevron-down-icon />
      </n-icon>
    </n-base-clear-button>
  </n-base-loading>
</template>

<script>
import NBaseClearButton from '../../clear-button'
import NBaseLoading from '../../loading'
import { ChevronDownIcon } from '../../icons'

export default {
  name: 'BaseSelectionSuffix',
  components: {
    ChevronDownIcon,
    NBaseLoading,
    NBaseClearButton
  },
  props: {
    theme: {
      type: String,
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    showClear: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function,
      default: undefined
    }
  }
}
</script>
