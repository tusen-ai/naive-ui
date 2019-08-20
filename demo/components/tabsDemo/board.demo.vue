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
      <n-tabs
        type="board"
        addable
      >
        <n-tab-panel label="Select">
          <n-form
            inline
            :label-width="80"
          >
            <n-form-item label="name">
              <n-input placeholder="Input your name" />
            </n-form-item>
            <n-form-item label="age">
              <n-input placeholder="Input your age" />
            </n-form-item>
            <n-form-item label="phone">
              <n-input placeholder="Input your phone number" />
            </n-form-item>
          </n-form>
        </n-tab-panel>
        <n-tab-panel
          label="Hover"
        >
          haha: <n-input />
        </n-tab-panel>
        <n-tab-panel label="Normal">
          lala: <n-icon />
        </n-tab-panel>
        <n-tab-panel
          disabled
          label="Disable"
        >
          hehe: <n-button />
        </n-tab-panel>
        <n-tab-panel
          v-for="(item, i) in panels"
          :key="i"
          :label="item.label"
        >
          {{ item.content }}
        </n-tab-panel>
      </n-tabs>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      panels: [],
      toggleName: 'b'
    }
  }
}
</script>
