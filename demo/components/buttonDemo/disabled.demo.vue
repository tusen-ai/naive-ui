<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Disabled
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button
        size="small"
        disabled
      >
        small size
      </n-button>
      <n-button disabled>
        regular size
      </n-button>
      <n-button
        size="large"
        disabled
      >
        large size
      </n-button>
      <n-button
        size="small"
        disabled
        type="primary"
      >
        small size
      </n-button>
      <n-button
        disabled
        type="primary"
      >
        regular size
      </n-button>
      <n-button
        size="large"
        disabled
        type="primary"
      >
        large size
      </n-button>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
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
