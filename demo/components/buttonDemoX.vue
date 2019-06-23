<template>
  <div
    ref="doc"
    class="doc"
  >
    <div class="doc-header">
      <n-gradient-text :font-size="20">
        n-button
      </n-gradient-text>
    </div>
    <div class="doc-body" />
    <div class="section-header">
      Basic Usage
    </div>
    <div class="section">
      <n-button
        round
        size="small"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        size="large"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <br>
      <n-button round>
        Cancel
      </n-button>
      <n-button
        type="primary"
        auto-text-color
      >
        Delete
      </n-button>
      <n-button
        type="primary"
        round
        auto-text-color
        @click="handleClick"
      >
        handleClick
      </n-button>
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
    </div>
    <div class="section-header">
      Round Button
    </div>
    <div class="section">
      <n-button
        round
        size="small"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        size="large"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <br>
      <n-button round>
        Cancel
      </n-button>
      <n-button
        type="primary"
        auto-text-color
      >
        Delete
      </n-button>
      <n-button
        type="primary"
        round
        auto-text-color
        @click="handleClick"
      >
        handleClick
      </n-button>
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
    </div>
    <div class="section-header">
      Button Type
    </div>
    <div class="section">
      <n-button
        round
        size="small"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        size="large"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <br>
      <n-button round>
        Cancel
      </n-button>
      <n-button
        type="primary"
        auto-text-color
      >
        Delete
      </n-button>
      <n-button
        type="primary"
        round
        auto-text-color
        @click="handleClick"
      >
        handleClick
      </n-button>
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
    </div>
    <div class="section-header">
      Icon Button
    </div>
    <div class="section">
      <n-button
        round
        size="small"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        size="large"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <br>
      <n-button round>
        Cancel
      </n-button>
      <n-button
        type="primary"
        auto-text-color
      >
        Delete
      </n-button>
      <n-button
        type="primary"
        round
        auto-text-color
        @click="handleClick"
      >
        handleClick
      </n-button>
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
    </div>
    <div class="section-header">
      Simulate Transparent Text
    </div>
    <div class="section">
      <n-button
        round
        size="small"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        icon="md-save"
      >
        Save as Template
      </n-button>
      <n-button
        round
        size="large"
        icon="md-save"
      >
        Save as Template
      </n-button>
      <br>
      <n-button round>
        Cancel
      </n-button>
      <n-button
        type="primary"
        auto-text-color
      >
        Delete
      </n-button>
      <n-button
        type="primary"
        round
        auto-text-color
        @click="handleClick"
      >
        handleClick
      </n-button>
      <n-button size="small">
        small size
      </n-button>
      <n-button>
        regular size
      </n-button>
      <n-button size="large">
        large size
      </n-button>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  methods: {
    handleClick () {
      alert('handleClick')
    }
  }
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
    flex-wrap: wrap;
  }
}
</style>

<style scoped>
.n-button {
  margin-right: 14px;
  margin-bottom: 8px;
}
</style>
