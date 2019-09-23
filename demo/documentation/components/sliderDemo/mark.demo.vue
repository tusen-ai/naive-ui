<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Mark
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-slider
        v-model="value"
        range
        :marks="marks"
        :step="10"
      />
      <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-input-number
        v-model="value[0]"
      />
      <n-input-number
        v-model="value[1]"
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
      value: [50, 70],
      marks: {
        34: 'Amazing',
        75: 'Good'
      }
    }
  }
}
</script>
