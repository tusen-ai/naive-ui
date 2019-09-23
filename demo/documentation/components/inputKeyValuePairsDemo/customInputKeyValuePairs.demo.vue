<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Custom Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-input-key-value-pairs
        v-model="test1"
        title="Add CheckBox"
      >
        <template v-slot="slotProps">
          <div style="width:100%">
            <n-checkbox
              v-model="slotProps.item.isCheck"
              style="width: 120px;"
            />
            <n-input-number
              v-model="slotProps.item.num"
            />
            <n-input
              v-model="slotProps.item.string"
              type="input"
              size="small"
            />
          </div>
        </template>
      </n-input-key-value-pairs>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ test1 }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test1: [
        {
          isCheck: true
        }
      ]
    }
  }
}
</script>
