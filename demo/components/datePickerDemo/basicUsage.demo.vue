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
        v-model="dateTimeTimestamp"
        type="datetime"
        style="margin-right: 12px;"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="dateTimestamp"
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
        v-model="dateTimeTimestamp"
        placeholder="dateTimeTimestamp"
        type="text"
        style="margin-right: 12px;"
      />
      <n-input
        v-model="dateTimestamp"
        placeholder="dateTimestamp"
        type="text"
      />
    </div>
    <pre class="n-doc-section__inspect">datetime v-model: {{ dateTimeTimestamp }}, date v-model: {{ dateTimestamp }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dateTimeTimestamp: 891360258000,
      dateTimestamp: 891360258000
    }
  },
  methods: {
    onDateTimeChange (timestamp, dateTimeString) {
      this.$NMessage.success(`${timestamp}, ${dateTimeString}`)
    },
    onDateChange (timestamp, dateString) {
      this.$NMessage.success(`${timestamp}, ${dateString}`)
    }
  }
}
</script>
