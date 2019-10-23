<template>
  <div style="overflow: hidden;">
    <!-- <div
      style="width: 100%; box-sizing: border-box; border-radius: 8px; border: 2px solid #5c657eff; height: 39px; background-color: black; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
      @click="collapse = !collapse"
    >
      <span v-if="collapse">Click to Expand</span>
      <span v-else>Click to Collapse</span>
    </div> -->
    <div
      ref="source"
      class="n-doc-section__source"
    >
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'NDocSourceBlock',
  data () {
    return {
      collapse: true
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      Array.from(this.$refs.source.querySelector('textarea')).forEach(ta => {
        console.log('ta', ta)
        const rows = ta.value.split('\n').length
        ta.setAttribute('rows', rows)
      })
    })
  }
}
</script>
