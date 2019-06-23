<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Pagination / n-pagination
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div
          class="n-doc-section__view"
          style="background-color: #1f263e;"
        >
          <n-pagination
            v-model="currentPage"
            :page-count="100"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-pagination
  v-model="currentPage"
  :page-count="100"
/>
<script>
export default {
  data () {
    return {
      currentPage: 1
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
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
  }
}
</script>
