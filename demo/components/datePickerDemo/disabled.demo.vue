<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Disabled
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
        :disabled="disabled"
        @change="onDateTimeChange"
      />
      <n-date-picker
        v-model="dateTimestamp"
        type="date"
        :disabled="disabled"
        @change="onDateChange"
      />
      <wrapper><oops content="666" /></wrapper>
      <!--EXAMPLE_END-->
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <n-switch v-model="disabled" />
    </div>
    <pre class="n-doc-section__inspect">datetime v-model: {{ dateTimeTimestamp }}, date v-model: {{ dateTimestamp }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
import Wrapper from './Wrapper'
import Oops from './Oops'
export default {
  components: {
    Wrapper,
    Oops
  },
  data () {
    return {
      dateTimeTimestamp: 891360258000,
      dateTimestamp: null,
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
