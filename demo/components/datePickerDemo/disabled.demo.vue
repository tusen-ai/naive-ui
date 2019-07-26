<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Disabled
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-date-picker
        v-model="datetime"
        type="datetime"
        style="margin-right: 12px; margin-bottom: 12px;"
        :disabled="disabled"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="datetime"
        type="date"
        :disabled="disabled"
        @change="onDateChange"
      />
      <n-date-picker
        v-model="datetimerange"
        :disabled="disabled"
        type="datetimerange"
        style="margin-bottom: 12px;"
      />
      <n-date-picker
        v-model="daterange"
        :disabled="disabled"
        type="daterange"
      />
      <!--EXAMPLE_END-->
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <n-switch v-model="disabled" />
    </div>
    <pre class="n-doc-section__inspect">date v-model: {{ JSON.stringify(date) }}
datetime v-model: {{ JSON.stringify(datetime) }}
datetimerange v-model: {{ JSON.stringify(datetimerange) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datetime: 891360258000,
      date: null,
      datetimerange: [324910284, 910391323],
      daterange: [324910284, 910391323],
      disabled: true
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
