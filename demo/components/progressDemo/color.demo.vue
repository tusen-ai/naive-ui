<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Color, Rail Color and Indicator Text Color
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="circle"
        :percentage="20"
        color="red"
        rail-color="yellow"
        indicator-text-color="green"
      />
      <n-progress
        type="line"
        color="red"
        rail-color="yellow"
        indicator-position="inside-label"
        indicator-text-color="green"
        :percentage="20"
      />
      <n-progress
        type="line"
        color="red"
        rail-color="yellow"
        :percentage="20"
        indicator-text-color="green"
      />
      <n-progress
        type="multiple-circle"
        :percentage="[50, 25]"
        :color="['red', 'blue']"
        :rail-color="['yellow', 'yellow']"
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
