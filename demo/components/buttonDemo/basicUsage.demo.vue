<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
      <n-button
        size="small"
        round
      >
        small size
      </n-button>
      <n-button round>
        regular size
      </n-button>
      <n-button
        size="large"
        round
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
