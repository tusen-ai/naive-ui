<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Event
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-tooltip
        placement="bottom"
        :width="200"
        trigger="hover"
        style="margin-right: 12px;"
        @show="handleShow"
        @hide="handleHide"
      >
        <template v-slot:activator>
          <n-button style="margin: 0;">
            California Girls(Hover)
          </n-button>
        </template>
        <span>
          I wish they all could be California girls
        </span>
      </n-tooltip>
      <n-tooltip
        placement="bottom"
        :width="200"
        trigger="click"
        style="margin-right: 12px;"
        @show="handleShow"
        @hide="handleHide"
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
      </n-tooltip>
      <n-tooltip
        v-model="showPopover"
        placement="bottom"
        :width="200"
        trigger="manual"
        @show="handleShow"
        @hide="handleHide"
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
      </n-tooltip>
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
      showPopover: false
    }
  },
  methods: {
    handleShow () {
      this.$NMessage.success('show tooltip')
    },
    handleHide () {
      this.$NMessage.success('hide tooltip')
    }
  }
}
</script>
