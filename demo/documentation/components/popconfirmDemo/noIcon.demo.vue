<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      No Icon
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popconfirm no-icon>
        <template v-slot:activator>
          <n-button>No Icon</n-button>
        </template>
        Are you sure to quit this game?
      </n-popconfirm>
      <!--EXAMPLE_END-->
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
    }
  }
}
</script>
