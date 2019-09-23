<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-input
        v-model="value"
        type="input"
        size="small"
      />
      <n-input
        v-model="value"
        type="input"
      />
      <n-input
        v-model="value"
        type="input"
        size="large"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">{{ JSON.stringify(value) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
