<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Actions
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-date-picker
        v-model="ts1"
        type="datetime"
        style="margin-right: 12px; margin-bottom: 12px;"
        :actions="['now']"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="ts2"
        type="date"
        :actions="['confirm']"
        style="margin-bottom: 12px;"
        @change="onDateChange"
      />
      <n-date-picker
        v-model="ts3"
        type="datetimerange"
        style="margin-bottom: 12px;"
        :actions="['clear']"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="ts4"
        type="daterange"
        :actions="null"
        style="margin-bottom: 12px;"
        @change="onDateChange"
      />
      <!--EXAMPLE_END-->
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
      ts1: null,
      ts2: 0,
      ts3: null,
      ts4: null
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
