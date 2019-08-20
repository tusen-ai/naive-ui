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
        type="card"
        closable
        addable
        :add-panel="addPanelItem"
        :tab-remove="tabRemove"
        :before-leave="beforeLeave"
      >
        <n-tab-panel label="closable">
          I am a input <n-input placeholder="lalala" />
        </n-tab-panel>
        <n-tab-panel
          active
          label="card mode"
        >
          I am an active button <n-button> hahaha </n-button>
          <br>Two mode supported now: normal and card.
          closable only can use in card mode.
          <br>
          Configure addable and add-panel attributes to dynamically add panels.
          <br>
          before-leave attribute: callback before tab-panel changed
          <br>
          tab-remove attribute: callback after tab removed, param is the instance of the panel.
          <br>
        </n-tab-panel>
        <n-tab-panel label="addable">
          I am a button <n-button> hahaha </n-button>
        </n-tab-panel>
        <n-tab-panel
          v-for="(i, j) in panels"
          :key="j"
          :label="i.label"
        >
          {{ i.content }}
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
      panels: []
    }
  },
  methods: {
    addPanelItem () {
      this.panels.push({
        label: this.panels.length,
        content: 'i am number' + this.panels.length
      })
    },
    tabRemove (i) {
      console.log('callback tab-remove', i)
    },
    beforeLeave (n, o) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('e')
        }, 500)
      })
    }
  }
}
</script>
