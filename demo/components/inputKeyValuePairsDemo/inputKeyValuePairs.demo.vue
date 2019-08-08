<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Default Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-input-key-value-pairs
        v-model="test1"
        placeholder-key="placeholder1"
        placeholder-value="placeholder2"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ test1 }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test1: [
        {
          key: 'key1',
          value: 'value1'
        },
        {}
      ]
    }
  }
}
</script>
