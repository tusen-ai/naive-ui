<template>
  <div class="doc">
    <h1>多选框</h1>
    <hr>
    <h2>基本用法</h2>
    <n-checkbox v-model="checked">
      Nimbus
    </n-checkbox><br>
    <n-checkbox v-model="checked" /><br>{{ String(checked) }}
    <br>
    <textarea rows="5"><n-checkbox v-model="checked">
  Nimbus
</n-checkbox></textarea>
    <hr>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  props: {},
  data () {
    return {
      checked: false
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
  background: #5C647B
}

</style>
