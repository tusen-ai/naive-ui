<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Custom Indicator
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="circle"
        :percentage="20"
      >
        666
      </n-progress>
      <n-progress
        type="line"
        status="success"
        :percentage="20"
      >
        666
      </n-progress>
      <n-progress
        type="multiple-circle"
        :percentage="[50, 25]"
      >
        666
      </n-progress>
    <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
    <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
}
</script>
