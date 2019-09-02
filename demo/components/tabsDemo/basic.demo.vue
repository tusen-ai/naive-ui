<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Panel
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-tabs
        v-model="name"
        closable
      >
        <n-tab-panel
          name="a"
          label="aaaaaaaa"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="b"
          label="bbbbbbbb"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="c"
          label="cccccccc"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="d"
          label="dddddddd"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="e"
          label="eeeeeeee"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="f"
          label="ffffffff"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="i"
          label="iiiiiiii"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="f"
          label="jjjjjjjj"
        >
          Name: b. <br>
          We can control the element display by setting the tab's name attribute.<br>
          Also we can use tab-panel's active attribute to init the display.
          And tab-panels's active attribute is the first priority.
        </n-tab-panel>
        <n-tab-panel
          name="g"
          label="gggggggg"
        >
          Name: a. <br>
        </n-tab-panel>
        <n-tab-panel
          name="h"
          label="hhhhhhhh"
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
    <pre class="n-doc-section__inspect">name: {{ name }}</pre>
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
    updateName () {
      this.name = this.name === 'a' ? 'b' : 'a'
    }
  }
}
</script>
