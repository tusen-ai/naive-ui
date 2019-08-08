<template>
  <div style="overflow: hidden;">
    <div
      style="width: 100%; box-sizing: border-box; border-radius: 8px; border: 2px solid #5c657eff; height: 39px; background-color: black; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
      @click="collapse = !collapse"
    >
      <span v-if="collapse">Click to Expand</span>
      <span v-else>Click to Collapse</span>
    </div>
    <div
      v-if="!collapse"
      ref="source"
      class="n-doc-section__source"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'

export default {
  name: 'NDocSourceBlock',
  data () {
    return {
      collapse: true
    }
  },
  watch: {
    collapse (newValue) {
      if (!newValue) {
        this.$nextTick().then(() => {
          CodeMirror.fromTextArea(this.$refs.source.querySelector('textarea'), {
            lineNumbers: false,
            mode: 'htmlmixed',
            theme: 'vibrant-ink'
          })
        })
      }
    }
  }
}
</script>
