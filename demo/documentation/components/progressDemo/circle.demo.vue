<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Circle
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="circle"
        :percentage="percentage"
      />
      <n-progress
        type="circle"
        status="success"
        :percentage="percentage"
      />
      <n-progress
        type="circle"
        status="warning"
        :percentage="percentage"
      />
      <n-progress
        type="circle"
        status="error"
        :percentage="percentage"
      />
      <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-button @click="minus">
        minus
      </n-button><n-button @click="add">
        add
      </n-button>
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
      percentage: 0
    }
  },
  methods: {
    add () {
      this.percentage += 10
      if (this.percentage > 100) this.percentage = 0
    },
    minus () {
      this.percentage -= 10
      if (this.percentage < 0) this.percentage = 100
    }
  }
}
</script>
