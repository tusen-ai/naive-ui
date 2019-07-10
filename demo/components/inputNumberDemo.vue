<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        InputNumber
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          {{ value }}
          <n-input-number v-model="value" />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-input-number v-model="value" /></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Min and Max
        </div>
        <div class="n-doc-section__view">
          {{ value }}
          <n-input-number
            v-model="value"
            :min="-5"
            :max="5"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-input-number
  v-model="value"
  :min="-5"
  :max="5"
/></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Step
        </div>
        <div class="n-doc-section__view">
          {{ value }}
          <n-input-number
            v-model="value"
            :min="-10"
            :max="10"
            step="3"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-input-number
  v-model="value"
  :min="-10"
  :max="10"
  step="3"
/></textarea>
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
      value: 'plx'
    }
  },
  methods: {
  }
}
</script>
