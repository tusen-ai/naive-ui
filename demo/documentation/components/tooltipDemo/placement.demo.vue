<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Placement
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <!--If you want to see more placement options, see Popover Page -->
      <n-tooltip placement="top-start">
        <template v-slot:activator>
          <n-button style="margin: 0;">
            hello tooltip
          </n-button>
        </template>
        This is the contextual help
      </n-tooltip>
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
