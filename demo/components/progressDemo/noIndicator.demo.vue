<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      No Indicator
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="circle"
        no-indicator
        status="success"
        :percentage="20"
      />
      <n-progress
        type="line"
        no-indicator
        status="success"
        :percentage="20"
      />
      <n-progress
        type="multiple-circle"
        :percentage="[50, 25]"
        no-indicator
      />
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
