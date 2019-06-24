<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Modal / n-modal
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-modal v-model="isActive">
            <template v-slot:activator>
              <n-button
                size="small"
                @click="isActive = true"
              >
                Start Me up
              </n-button>
            </template>
            <div style="background: #5C657EFF; padding: 24px; border-radius: 8px;">
              <div>If you start me up, If you start me up, I'll never stop.</div>
              <n-input v-model="inputValue" />
              inputValue: {{ inputValue }}<br>
              <n-button
                size="small"
                @click="isActive = false"
              >
                Close it
              </n-button>
            </div>
          </n-modal>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
/**
 * Modal's default position is vertical and horizontal centered.
 */
<n-modal v-model="isActive">
  <template v-slot:activator>
    <n-button
      size="small"
      @click="isActive = true"
    >
      Start Me up
    </n-button>
  </template>
  <div style="background: #5C657EFF; padding: 24px; border-radius: 8px;">
    <div>If you start me up, If you start me up, I'll never stop.</div>
    <n-input v-model="inputValue" />
    inputValue: {{ inputValue }}<br>
    <n-button
      size="small"
      @click="isActive = false"
    >
      Close it
    </n-button>
  </div>
</n-modal>

<script>
export default {
  data () {
    return {
      inputValue: '',
      isActive: false
    }
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
      inputValue: '',
      isActive: false
    }
  },
  methods: {
  }
}
</script>
