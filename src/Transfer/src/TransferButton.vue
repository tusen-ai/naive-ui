<template>
  <div
    class="n-transfer-button"
    :class="{
      'n-transfer-button--to': to,
      'n-transfer-button--disabled': disabled
    }"
    @click="handleClick"
  >
    <svg
      viewBox="0 0 36 36"
      class="n-transfer-button__icon"
    ><title>Transfer Button</title>
      <g>
        <path
          d="M18,0A18,18,0,1,0,36,18,18,18,0,0,0,18,0Zm2.5,23.44a1.06,1.06,0,0,1,0,1.46,1,1,0,0,1-1.41,0l-6-6.22a1,1,0,0,1,0-1.42l6-6.16a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.45L15.21,18Z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import createValidator from '../../_utils/vue/validateProp'

export default {
  props: {
    to: {
      validator: createValidator(['boolean']),
      default: false
    }
  },
  inject: {
    NTransfer: {
      default: null
    }
  },
  computed: {
    disabled () {
      if (this.NTransfer.disabled) return true
      if (this.to) return this.NTransfer.sourceCheckedValues.length === 0
      else return this.NTransfer.targetCheckedValues.length === 0
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>
