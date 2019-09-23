<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Size
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-input-number
        v-model="value"
        size="small"
      />
      <n-input-number
        v-model="value"
        size="medium"
      />
      <n-input-number
        v-model="value"
        size="large"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">value: {{ JSON.stringify(value) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  }
}
</script>
