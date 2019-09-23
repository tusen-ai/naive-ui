<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Accordion
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-collapse
        v-model="activeName"
        accordion
      >
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
    <pre class="n-doc-section__inspect">{{ JSON.stringify(activeName) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>
