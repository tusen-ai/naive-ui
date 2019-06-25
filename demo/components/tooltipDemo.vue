<template>
  <div
    ref="doc"
    class="doc"
  >
    <div class="doc-header">
      <n-gradient-text :font-size="18">
        n-tooltip
      </n-gradient-text>
    </div>
    <div class="doc-body" />
    <div class="section-header">
      Basic Usage
    </div>
    <div class="section">
      <n-tooltip>
        <template v-slot:activator>
          <n-button style="margin: 0;">
            hello tooltip
          </n-button>
        </template>
        <div>
          This is the contextual help
        </div>
      </n-tooltip>
    </div>
    <textarea rows="5"><n-tooltip>
  <template v-slot:activator>
    <n-button style="margin: 0;">hello tooltip</n-button>
  </template>
  <div>
    This is the contextual help
  </div>
</n-tooltip></textarea>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin]
}
</script>

<style scoped lang="scss">
.doc {
  width: 780px;
  margin: 0 auto;
  .doc-header {
    display: flex;
    height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    align-items: center;
  }
  .doc-body {
    padding-top: 14px;
  }
  .section-header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .section {
    background: #5C657EFF;
    padding: 18px;
    border-radius: 8px;
    justify-content: center;
    display: flex;
    margin-bottom: 12px;
  }
}

</style>
