<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Custom Icon
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popconfirm
        positive-text="ok"
        negative-text="not ok"
      >
        <template v-slot:icon>
          <n-icon
            type="md-hand"
            color="red"
          />
        </template>
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
  data () {
    return {
    }
  }
}
</script>
