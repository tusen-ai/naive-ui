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
      <n-switch
        v-model="isActive"
      />
      <n-switch
        v-model="isActive"
        disabled
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">active: {{ isActive }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  }
}
</script>
