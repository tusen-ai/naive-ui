<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Custom Action
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popconfirm :controller="controller">
        <template v-slot:activator>
          <n-button>Quit</n-button>
        </template>
        Are you sure to quit this game?
        <template v-slot:action>
          <n-button
            size="tiny"
            @click="handleOopsClick"
          >
            oops!
          </n-button>
        </template>
      </n-popconfirm>
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
      controller: {}
    }
  },
  methods: {
    handleOopsClick () {
      this.$NMessage.info('oops!')
      if (this.controller) this.controller.hide()
    }
  }
}
</script>
