<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Checkbox / n-checkbox
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-checkbox
            v-model="isChecked"
            style="width: 120px;"
          >
            checkbox
          </n-checkbox>
          <n-checkbox
            v-model="isChecked"
            style="width: 120px;"
          />
          <div style="width: 120px;">
            isChecked: {{ isChecked }}
          </div>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-checkbox
  v-model="isChecked"
  style="width: 120px;"
>
  checkbox
</n-checkbox>
<n-checkbox
  v-model="isChecked"
  style="width: 120px;"
/>
<div style="width: 120px;">
  isChecked: {{ isChecked }}
</div></textarea>
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
      isChecked: false
    }
  },
  methods: {
  }
}
</script>
