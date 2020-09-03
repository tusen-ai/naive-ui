<template>
  <component-demo
    demo-file-name="<!--DEMO_FILE_NAME-->"
    title="<!--TITLE_SLOT-->"
  >
    <template v-slot:title>
      <!--TITLE_SLOT-->
    </template>
    <template v-slot:content>
      <!--CONTENT_SLOT-->
    </template>
    <template v-slot:demo>
      <div
        class="demo-card__view"
      >
      <!--DEMO_SLOT-->
      </div>
    </template>
    <template
      v-slot:code
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
