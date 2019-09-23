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
      <n-slider
        v-model="value"
        :step="10"
      />
      <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-input-number
        v-model="value"
      />
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
      value: 50
    }
  }
}
</script>
