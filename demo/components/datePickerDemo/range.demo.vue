<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Range
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-date-picker
        v-model="ts1"
        type="datetimerange"
        style="margin-right: 12px;"
      />
    </div>
    <pre class="n-doc-section__inspect">datetimerange v-model: {{ JSON.stringify(ts1) }}</pre>
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
      ts1: null,
      ts2: [0, 0]
    }
  },
  methods: {
  }
}
</script>
