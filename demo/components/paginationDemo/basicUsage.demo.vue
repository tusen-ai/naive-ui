<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-pagination
        v-model="page"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :page-count="8"
        :disabled="disabled"
        @page-size-change="handlePageSizeChange"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">{{
      JSON.stringify({
        page: page,
        pageSize: pageSize
      }, 0, 2)
    }}</pre>
    <div class="n-doc-section__inspect">
      <n-switch v-model="disabled" />
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 2,
      pageSize: 20,
      disabled: false
    }
  },
  methods: {
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
    },
    toggleDisable () {
      this.disabled = !this.disabled
    }
  }
}
</script>
