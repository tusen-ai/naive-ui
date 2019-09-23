<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Icon / n-icon
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-icon
            type="ios-contacts"
            size="40"
          />
          <n-icon
            type="md-contacts"
            size="40"
          />
          <n-icon
            type="md-cash"
            size="40"
            color="#000000"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea>
/**
 * If you don't specify its size, it will inherit font-size from its parent element
 */
<n-icon
  type="ios-contacts"
  size="40"
/>
<n-icon
  type="md-contacts"
  size="40"
/>
<n-icon
  type="md-cash"
  size="40"
  color="#000000"
/>
          </textarea>
        </div>
      </div>
    </div>
    <div class="n-doc-section">
      <div class="n-doc-section__header">
        Note
      </div>
      <textarea>
Type of Icon: See "https://ionicons.com/" Ionicons.
If you use ios icon, type will be ios-***.
If you use material icon, type will be md-***</textarea>
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
