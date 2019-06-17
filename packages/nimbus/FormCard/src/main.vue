<template>
  <div
    class="n-nimbus-form-card"
    :style="{width: width}"
  >
    <span>Create Pod</span>
    example
  </div>
</template>

<script>
export default {
  name: 'NNimbusFormCard',
  props: {
    width: {
      type: Number,
      default: 900
    }
  }
}
</script>

<style lang="scss" scoped>
.n-nimbus-form-card {
  min-width: 600px;
  width: 1032px;
  background: #5C657E;
  padding: 24px 45px;
  border-radius: 9px;
  .title {
    line-height: 19px;
    margin-bottom: 24px;
  }
}
</style>
