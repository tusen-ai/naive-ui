<template>
  <n-base-loading
    class="n-base-selection__mark"
    :stroke-width="20"
    :scale="0.8"
    :show="loading"
  >
    <n-base-clear-button
      v-if="showArrow"
      :unstable-theme="BaseSelection.mergedTheme.peers.BaseClearButton"
      :unstable-theme-overrides="
        BaseSelection.mergedTheme.overrides.BaseClearButton
      "
      :show="showClear"
      @clear="onClear"
    >
      <n-base-icon depth="4">
        <chevron-down-icon />
      </n-base-icon>
    </n-base-clear-button>
  </n-base-loading>
</template>

<script>
import { defineComponent } from 'vue'
import NBaseClearButton from '../../clear-button'
import NBaseLoading from '../../loading'
import NBaseIcon from '../../icon'
import { ChevronDownIcon } from '../../icons'

export default defineComponent({
  name: 'BaseSelectionSuffix',
  components: {
    ChevronDownIcon,
    NBaseIcon,
    NBaseLoading,
    NBaseClearButton
  },
  inject: ['BaseSelection'],
  props: {
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
})
</script>
