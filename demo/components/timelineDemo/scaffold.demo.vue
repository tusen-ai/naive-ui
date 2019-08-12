<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Bacis Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-timeline>
        <n-timeline-item>123</n-timeline-item>
        <n-timeline-item
          type="success"
          timestamp="2018-04-03 20:46"
        >
          123
        </n-timeline-item>
        <n-timeline-item
          type="error"
          timestamp="2018-04-03 20:46"
        >
          123
        </n-timeline-item>
        <n-timeline-item
          type="warning"
          timestamp="2018-04-03 20:46"
        >
          123
        </n-timeline-item>
        <n-timeline-item
          type="info"
          timestamp="2018-04-03 20:46"
        >
          123
        </n-timeline-item>
      </n-timeline>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
