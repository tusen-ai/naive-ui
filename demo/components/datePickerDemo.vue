<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        scaffold
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="dateTimeTimestamp"
            placeholder="dateTimeTimestamp"
            type="text"
          />
          <div style="width: 100%;">
            dateTimeTimestamp: {{ dateTimeTimestamp }}
          </div>
          <n-with-padding :padding-top="12" />
          <n-input
            v-model="dateTimestamp"
            placeholder="dateTimestamp"
            type="text"
          />
          <div style="width: 100%;">
            dateTimeStamp: {{ dateTimestamp }}
          </div>
          <n-with-padding :padding-top="12" />
          <n-date-picker
            v-model="dateTimeTimestamp"
            type="datetime"
            @change="onDateTimeChange"
          />
          <n-with-padding :padding-top="12" />
          <n-date-picker
            v-model="dateTimestamp"
            type="date"
            @change="onDateChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-date-picker
  v-model="dateTimeTimestamp"
  type="datetime"
  @change="onDateTimeChange"
/>
<n-date-picker
  v-model="dateTimestamp"
  type="date"
  @change="onDateChange"
/>
<script>
export default {
  data () {
    return {
      dateTimeTimestamp: 666666666,
      dateTimestamp: null
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
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      dateTimeTimestamp: 666666666,
      dateTimestamp: null
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
