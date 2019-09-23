<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-collapse v-model="activeNames">
        <n-collapse-item
          title="right"
          name="1"
        >
          <div>good</div>
        </n-collapse-item>
        <div />
        <NCollapseItem
          title="right"
          name="2"
        >
          <div>good</div>
        </NCollapseItem>
      </n-collapse>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">{{ JSON.stringify(activeNames) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: ['1', '1', null]
    }
  }
}
</script>
