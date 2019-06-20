<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>n-tooltip</h1>
    <hr>
    <h2>基本用法</h2>
    <n-tooltip>
      <template v-slot:activator>
        <button>hello tooltip</button>
      </template>
      <div>
        This is the contextual help
      </div>
    </n-tooltip>
    <br><br>
    <textarea rows="5"><n-tooltip>
  <template v-slot:activator>
    scaffold
  </template>
  <div>
    This is the contextual help
  </div>
</n-tooltip></textarea>
    <hr>
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
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
