<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Line
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-progress
        type="line"
        :percentage="percentage"
        :show-indicator="false"
      />
      <n-progress
        type="line"
        :percentage="percentage"
      />
      <n-progress
        type="line"
        :percentage="percentage"
        :indicator-position="'inside'"
      />
      <n-progress
        type="line"
        :percentage="percentage"
        :indicator-position="'inside-label'"
      />
      <n-progress
        type="line"
        status="success"
        :percentage="percentage"
        :show-indicator="false"
      />
      <n-progress
        type="line"
        status="success"
        :percentage="percentage"
      />
      <n-progress
        type="line"
        status="success"
        :percentage="percentage"
        :indicator-position="'inside'"
      />
      <n-progress
        type="line"
        status="success"
        :percentage="percentage"
        :indicator-position="'inside-label'"
      />
      <n-progress
        type="line"
        status="warning"
        :percentage="percentage"
        :show-indicator="false"
      />
      <n-progress
        type="line"
        status="warning"
        :percentage="percentage"
      />
      <n-progress
        type="line"
        status="warning"
        :percentage="percentage"
        :indicator-position="'inside'"
      />
      <n-progress
        type="line"
        status="warning"
        :percentage="percentage"
        :indicator-position="'inside-label'"
      />
      <n-progress
        type="line"
        status="error"
        :percentage="percentage"
        :show-indicator="false"
      />
      <n-progress
        type="line"
        status="error"
        :percentage="percentage"
      />
      <n-progress
        type="line"
        status="error"
        :percentage="percentage"
        :indicator-position="'inside'"
      />
      <n-progress
        type="line"
        status="error"
        :percentage="percentage"
        :indicator-position="'inside-label'"
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
      percentage: 50
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
