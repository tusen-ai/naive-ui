<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Width
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popover :width="500">
        <template v-slot:activator>
          <n-button style="margin:0;">
            hover
          </n-button>
        </template>
        <span>Light My Fire</span>
      </n-popover>
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
