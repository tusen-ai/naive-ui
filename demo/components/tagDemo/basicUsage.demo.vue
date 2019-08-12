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
      <n-tag>Real Love</n-tag>
      <n-tag
        type="success"
        closable
        @close="handleClose"
      >
        Yes It Is
      </n-tag>
      <n-tag
        type="warning"
        closable
        @close="handleClose"
      >
        I'm Down
      </n-tag>
      <n-tag
        type="error"
        closable
        @close="handleClose"
      >
        Yesterday
      </n-tag>
      <n-tag
        type="info"
        closable
        @close="handleClose"
      >
        I'm Looking Through You
      </n-tag>
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
    handleClose () {
      this.$NMessage.info('tag close')
    }
  }
}
</script>

<!--STYLE_EXAMPLE_START-->
<style
  scoped
>
.n-tag {
  margin-right: 12px;
}
</style>
<!--STYLE_EXAMPLE_END-->
