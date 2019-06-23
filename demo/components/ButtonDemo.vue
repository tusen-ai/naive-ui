<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>按钮 / n-button</h1>
    <hr>
    <h2>基本用法</h2>
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
    <br><br>
    <textarea rows="30">
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
<n-button type="primary">
  Delete
</n-button>
<n-button
  type="primary"
  round
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
</textarea>
    <hr>
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
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
