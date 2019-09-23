<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Textarea
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-input
        v-model="value"
        placeholder="Nowhere Man"
        type="textarea"
        size="small"
        :rows="5"
      />
      <n-input
        v-model="value"
        type="textarea"
        size="large"
        :rows="3"
      />
      <!--EXAMPLE_END-->
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
      value: null
    }
  }
}
</script>
