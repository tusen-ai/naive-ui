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
      <n-date-picker
        v-model="ts1"
        type="datetime"
        style="margin-right: 12px;"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="ts2"
        type="date"
        @change="onDateChange"
      />
      <!--EXAMPLE_END-->
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <n-input
        :value="ts1"
        placeholder="ts1"
        type="text"
        style="margin-right: 12px;"
        @input="handleInputTs1"
      />
      <n-input
        :value="ts2"
        placeholder="ts2"
        type="text"
        @input="handleInputTs2"
      />
    </div>
    <pre class="n-doc-section__inspect">datetime v-model: {{ JSON.stringify(ts1) }}, date v-model: {{ JSON.stringify(ts2) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ts1: null,
      ts2: 0
    }
  },
  methods: {
    onDateTimeChange (timestamp, dateTimeString) {
      this.$NMessage.success(`${timestamp}, ${dateTimeString}`)
    },
    onDateChange (timestamp, dateString) {
      this.$NMessage.success(`${timestamp}, ${dateString}`)
    },
    handleInputTs1 (v) {
      if (v === '') {
        this.ts1 = null
        return
      }
      v = Number(v)
      this.ts1 = Number.isNaN(v) ? null : v
    },
    handleInputTs2 (v) {
      if (v === '') {
        this.ts2 = null
        return
      }
      v = Number(v)
      this.ts2 = Number.isNaN(v) ? null : v
    }
  }
}
</script>
