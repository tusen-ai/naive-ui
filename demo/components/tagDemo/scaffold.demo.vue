<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-tag>Label 1</n-tag>
      <n-tag
        type="success"
        closable
        @close="handleClose"
      >
        Label 1
      </n-tag>
      <n-tag
        type="warning"
        closable
        @close="handleClose"
      >
        Label 1
      </n-tag>
      <n-tag
        type="error"
        closable
        @close="handleClose"
      >
        Label 1
      </n-tag>
      <n-tag
        type="info"
        closable
        @close="handleClose"
      >
        Label 1
      </n-tag>
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
    handleClose () {
      this.$NMessage.info('tag close')
    }
  }
}
</script>
