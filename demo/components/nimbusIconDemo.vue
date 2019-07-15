<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        NimbusIcon / n-nimbus-icon
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-nimbus-icon
            type="share"
            color="#63e2b7"
            size="24"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea>
/**
 * Valid type: share
 */
<n-nimbus-icon
  type="share"
  color="#63e2b7"
  size="24"
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

    }
  },
  methods: {
  }
}
</script>
