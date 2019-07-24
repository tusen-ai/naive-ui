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
      <n-time-picker
        v-model="time0"
        style="margin-right: 14px;"
      />
      <n-time-picker v-model="time1" />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">time0: {{ JSON.stringify(time0) }}, time1: {{ JSON.stringify(time1) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time0: null,
      time1: 1563937380000
    }
  }
}
</script>
