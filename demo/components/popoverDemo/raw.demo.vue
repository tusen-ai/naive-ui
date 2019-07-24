<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Raw Content
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popover
        raw
      >
        <template v-slot:activator>
          <n-button style="margin:0;">
            hover
          </n-button>
        </template>
        <div style="width: 100px; height: 100px; background-color: red;">
          Who kicks a hole in the sky so the heaven cry over me.
        </div>
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
