<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Max Width
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-tooltip
        :max-width="400"
        trigger="click"
      >
        <template v-slot:activator>
          <n-button style="margin: 0;">
            hello tooltip
          </n-button>
        </template>
        I wish they all could be California girls. I wish they all could be California girls. I wish they all could be California girls.
      </n-tooltip>
      <n-tooltip
        :max-width="400"
        trigger="click"
      >
        <template v-slot:activator>
          <n-button style="margin: 0;">
            hello tooltip
          </n-button>
        </template>
        I wish ...
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
