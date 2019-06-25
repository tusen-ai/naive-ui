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
          <n-switch
            v-model="isActive"
          />
          <div style="margin: 0 14px;">
            active: {{ isActive }}
          </div>
          <n-switch
            v-model="isActive"
            disabled
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-switch v-model="isActive" />
<div style="margin: 0 14px;">
  active: {{ isActive }}
</div>
<n-switch
  v-model="isActive"
  disabled
/>
<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  methods: {
  }
}
</script></textarea>
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
      isActive: false
    }
  },
  methods: {
  }
}
</script>
