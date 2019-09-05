<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Events
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="handleClick">
        Click Me
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
    handleClick () {
      this.$NMessage.info('Button Clicked')
    }
  }
}
</script>
