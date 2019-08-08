<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      DateTime Range
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-date-picker
        v-model="range1"
        type="datetimerange"
        style="margin-bottom: 12px;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">range1 v-model: {{ JSON.stringify(range1) }}
range2 v-model: {{ JSON.stringify(range2) }}
range3 v-model: {{ JSON.stringify(range3) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
/*
 * padding
 * padding
 * padding
 * padding
 * padding
 */
export default {
  data () {
    return {
      range1: null,
      range2: [1562774466000, 1567180866000],
      range3: [1562774400000, 1567180800000]
    }
  },
  methods: {
  }
}
</script>
