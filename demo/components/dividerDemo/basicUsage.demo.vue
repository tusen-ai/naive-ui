<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-divider />
      <n-divider>A Happy Ending</n-divider>
      <n-divider content-position="left">
        A Happy Ending
      </n-divider>
      <n-divider content-position="right">
        A Happy Ending
      </n-divider>
      <n-divider dashed>
        A Happy Ending
      </n-divider>
      <div style="width: 100%;">
        A<n-divider vertical />Happy<n-divider vertical />Ending
      </div>
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
  }
}
</script>
