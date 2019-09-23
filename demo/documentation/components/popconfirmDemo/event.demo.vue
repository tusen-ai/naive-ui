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
      <n-popconfirm
        @positive-click="handlePositiveClick"
        @negative-click="handleNegativeClick"
      >
        <template v-slot:activator>
          <n-button>Quit</n-button>
        </template>
        Are you sure to quit this game?
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
  methods: {
    handlePositiveClick () {
      this.$NMessage.info('positive click')
    },
    handleNegativeClick () {
      this.$NMessage.info('negative click')
    }
  }
}
</script>
