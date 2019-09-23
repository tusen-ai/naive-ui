<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Placeholder
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
        placeholder="Stairway to Heaven"
        round
      />
      <n-input
        v-model="value"
        type="textarea"
        size="small"
        placeholder="Stairway to Heaven"
        round
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
