<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="emitInfo">
        Last for 5 second
      </n-button>
      <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    emitInfo () {
      this.$NMessage.info('I don\'t know why nobody told you how to unfold your love', { duration: 5000 })
    }
  }
}
</script>
