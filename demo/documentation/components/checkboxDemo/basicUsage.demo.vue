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
      <n-checkbox
        v-model="isChecked"
        style="width: 120px;"
      >
        checkbox
      </n-checkbox>
      <n-checkbox
        v-model="isChecked"
        style="width: 120px;"
      />
      <n-checkbox
        v-model="isChecked"
        disabled
        style="width: 120px;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">isChecked: {{ isChecked }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isChecked: false
    }
  }
}
</script>
