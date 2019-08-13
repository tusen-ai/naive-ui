<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Multiple Circle
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="multiple-circle"
        :stroke-width="4"
        :circle-gap="2"
        :percentage="[percentage, (percentage +10) % 100, (percentage +20) % 100, (percentage + 30) % 100]"
        :color="['red', 'green', 'blue', null]"
        :rail-color="['rgba(0, 255, 0, .2)', 'rgba(0, 0, 255, .2)', 'rgba(255, 0, 0, .2)', 'rgba(255, 255, 255, .2)']"
      >
        <div style="text-align: center;">
          CPU<br>
          Allocation<br>
          cores
        </div>
      </n-progress>
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
