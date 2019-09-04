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
export default {
  props: {
    to: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
