<template>
  <component-demo>
    <template v-slot:title>
      <!--TITLE_SLOT-->
    </template>
    <template v-slot:content>
      <!--CONTENT_SLOT-->
    </template>
    <template v-slot:demo>
      <!--DEMO_SLOT-->
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
