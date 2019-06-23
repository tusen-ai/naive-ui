<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Button / n-button
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
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
        <div class="n-doc-section__source">
          <textarea><n-button size="small">
  small size
</n-button>
<n-button>
  regular size
</n-button>
<n-button size="large">
  large size
</n-button></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Button Type
        </div>
        <div class="n-doc-section__view">
          <n-button
            size="small"
            type="primary"
            auto-text-color
          >
            small size
          </n-button>
          <n-button
            type="primary"
            auto-text-color
          >
            regular size
          </n-button>
          <n-button
            size="large"
            type="primary"
            auto-text-color
          >
            large size
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea>
/**
 * 注意 auto-text-color 会将 type="primary" 的按钮的文字颜色设定为背景色
 * 如果不设定 将使用黑色作为文字颜色
 * 请注意设计稿还原
 */
<n-button
  size="small"
  type="primary"
  auto-text-color
>
  small size
</n-button>
<n-button
  type="primary"
  auto-text-color
>
  regular size
</n-button>
<n-button
  size="large"
  type="primary"
  auto-text-color
>
  large size
</n-button></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Icon Button
        </div>
        <div class="n-doc-section__view">
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
        </div>
        <div class="n-doc-section__source">
          <textarea><n-button
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
</n-button></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Simulate Transparent Text
        </div>
        <div class="n-doc-section__view">
          <div style="padding: 14px; background: white; margin-right: 14px; border-radius: 8px;">
            <n-button
              type="primary"
              auto-text-color
            >
              with-auto-text-color
            </n-button>
          </div>
          <div style="padding: 14px; background: white; border-radius: 8px;">
            <n-button type="primary">
              without-auto-text-color
            </n-button>
          </div>
        </div>
        <div class="n-doc-section__source">
          <textarea><div style="padding: 14px; background: white; margin-right: 14px; border-radius: 8px;">
  <n-button
    type="primary"
    auto-text-color
  >
    with-auto-text-color
  </n-button>
</div>
<div style="padding: 14px; background: white; border-radius: 8px;">
  <n-button type="primary">
    without-auto-text-color
  </n-button>
</div></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Handle Click
        </div>
        <div class="n-doc-section__view">
          <n-button @click="handleClick">
            Click Me
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<n-button @click="handleClick">Click Me</n-button><script>
export default {
  methods: {
    handleClick () {
      alert('handleClick')
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
  methods: {
    handleClick () {
      alert('handleClick')
    }
  }
}
</script>
<style scoped>
.n-button {
  margin-right: 14px;
  margin-bottom: 8px;
}
</style>
