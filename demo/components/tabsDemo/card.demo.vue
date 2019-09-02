<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Card
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-tabs
        v-model="name"
        type="card"
        closable
        addable
      >
        <n-tab-panel
          name="a"
          label="a"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="b"
          label="b"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="c"
          label="c"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="d"
          label="d"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="e"
          label="e"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="f"
          label="f"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          disabled
          label="Disabled"
        />
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
      name: 'b'
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
