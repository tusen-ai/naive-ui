<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>分页 / n-pagination</h1>
    <hr>
    <h2>基本用法</h2>
    <n-pagination
      v-model="page"
      :page-count="100"
    />
    <br><br>
    page: {{ page }}
    <br><br>
    <textarea rows="5"><n-pagination
  v-model="page"
  :page-count="100"
/></textarea>
    <hr>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      page: 1
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
