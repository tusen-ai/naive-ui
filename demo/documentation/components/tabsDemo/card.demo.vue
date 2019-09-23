<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Card
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-tabs
        v-model="name"
        type="card"
        closable
        @close="handleClose"
      >
        <n-tab-panel
          v-for="panel in panels"
          :key="panel"
          :label="panel.toString()"
          :name="panel.toString()"
        >
          {{ panel }}
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
      panels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      name: '1'
    }
  },
  methods: {
    handleClose (name) {
      this.$NMessage.info('Close ' + name)
      const index = this.panels.findIndex(v => name === v.toString())
      if (~index) {
        this.panels.splice(index, 1)
      }
    }
  }
}
</script>
