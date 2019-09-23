<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Gradient Text / n-gradient-text
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-gradient-text style="margin-right: 14px;">
            Hey Jude
          </n-gradient-text>
          <n-gradient-text font-size="24">
            Wonderwall
          </n-gradient-text>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-gradient-text style="margin-right: 14px;">
  Hey Jude
</n-gradient-text>
<n-gradient-text font-size="24">
  Wonderwall
</n-gradient-text></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Different Type
        </div>
        <div class="n-doc-section__view">
          <n-gradient-text
            font-size="24"
            type="danger"
          >
            Live Forever
          </n-gradient-text>
          <n-gradient-text
            font-size="24"
            type="warning"
          >
            Married with Children
          </n-gradient-text>
          <n-gradient-text
            font-size="24"
            type="success"
          >
            Back in the USSR
          </n-gradient-text>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-gradient-text
  font-size="24"
  type="danger"
>
  Live Forever
</n-gradient-text>
<n-gradient-text
  font-size="24"
  type="warning"
>
  Married with Children
</n-gradient-text>
<n-gradient-text
  font-size="24"
  type="success"
>
  Back in the USSR
</n-gradient-text></textarea>
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

    }
  },
  methods: {
  }
}
</script>
