<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Trigger
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popover
        placement="bottom"
        :width="200"
        trigger="hover"
        style="margin-right: 12px;"
      >
        <template v-slot:activator>
          <n-button style="margin: 0;">
            California Girls(Hover)
          </n-button>
        </template>
        <span>
          I wish they all could be California girls
        </span>
      </n-popover>
      <n-popover
        placement="bottom"
        :width="200"
        trigger="click"
        style="margin-right: 12px;"
      >
        <template v-slot:activator>
          <n-button
            style="margin: 0;"
          >
            California Girls(Click)
          </n-button>
        </template>
        <span>
          I wish they all could be California girls
        </span>
      </n-popover>
      <n-popover
        v-model="showPopover"
        placement="bottom"
        :width="200"
        trigger="manual"
      >
        <template v-slot:activator>
          <n-button
            style="margin: 0;"
            @click="showPopover = !showPopover"
          >
            California Girls(Manual)
          </n-button>
        </template>
        <span>
          I wish they all could be California girls
        </span>
      </n-popover>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">(trigger="menu")showPopover: {{ JSON.stringify(showPopover) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPopover: false
    }
  }
}
</script>
