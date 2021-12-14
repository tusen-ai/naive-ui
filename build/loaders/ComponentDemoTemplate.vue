<template>
  <component-demo
    demo-file-name="<!--DEMO_FILE_NAME-->"
    relative-url="<!--URL-->"
    title="<!--TITLE_SLOT-->"
    ts-code="<!--TS_CODE_SLOT-->"
    js-code="<!--JS_CODE_SLOT-->"
    language-type="<!--LANGUAGE_TYPE_SLOT-->"
  >
    <template #title>
      <!--TITLE_SLOT-->
    </template>
    <template #content>
      <!--CONTENT_SLOT-->
    </template>
    <template #demo>
      <div class="demo-card__view">
        <!--DEMO_SLOT-->
      </div>
    </template>
  </component-demo>
</template>

<!--SCRIPT_SLOT-->

<!--STYLE_SLOT-->
