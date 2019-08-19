<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Multiple Select
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popselect
        v-model="value"
        multiple
        @change="handleChange"
      >
        <template v-slot:activator>
          <n-tag>{{ (Array.isArray(value) && value.length) ? value : 'popselect' }}</n-tag>
        </template>
        <n-popselect-option
          label="Go Let It Out"
          value="Go Let It Out"
        />
        <n-popselect-option
          label="Who Feels Love?"
          value="Who Feels Love?"
        />
        <n-popselect-option
          disabled
          label="Sunday Morning Call"
          value="Sunday Morning Call"
        />
        <n-popselect-option
          label="Roll It Over"
          value="Roll It Over"
        />
      </n-popselect>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ JSON.stringify(value) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    handleChange (value) {
      this.$NMessage.info(JSON.stringify(value))
    }
  }
}
</script>
