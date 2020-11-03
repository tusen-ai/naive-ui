<template>
  <component-demo
    demo-file-name="<!--DEMO_FILE_NAME-->"
    relative-url="<!--URL-->"
    title="<!--TITLE_SLOT-->"
  >
    <template #title>
      <!--TITLE_SLOT-->
    </template>
    <template #content>
      <!--CONTENT_SLOT-->
    </template>
    <template #demo>
      <div
        class="demo-card__view"
      >
      <!--DEMO_SLOT-->
      </div>
    </template>
    <template
      #code
    >
      <!--CODE_SLOT-->
    </template>
  </component-demo>
</template>

<script>
/** SCRIPT_SLOT */
</script>

<style scoped lang="scss">
.demo-card__view, .naive-ui-doc {
  /**STYLE_SLOT*/
}
</style>
