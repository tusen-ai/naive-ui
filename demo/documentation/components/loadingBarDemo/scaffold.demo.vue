<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basis Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="handleStart">
        start
      </n-button>
      <n-button @click="handleFinish">
        finish
      </n-button>
      <n-button @click="handleError">
        error
      </n-button>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
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
    handleStart () {
      this.$NLoadingBar.start()
    },
    handleFinish () {
      this.$NLoadingBar.finish()
    },
    handleError () {
      this.$NLoadingBar.error()
    }
  }
}
</script>
