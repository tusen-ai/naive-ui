<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Custom Width
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-popselect
        v-model="value"
        :width="240"
        multiple
        :options="options"
        @change="handleChange"
      >
        <template v-slot:activator>
          <n-tag>{{ (Array.isArray(value) && value.length) ? value : 'popselect' }}</n-tag>
        </template>
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
      value: null,
      options: [{
        label: 'Go Let It Out',
        value: 'Go Let It Out'
      }, {
        label: 'Who Feels Love?',
        value: 'Who Feels Love?'
      }, {
        label: 'Sunday Morning Call',
        value: 'Sunday Morning Call',
        disabled: true
      }, {
        label: 'Roll It Over',
        value: 'Roll It Over'
      }]
    }
  },
  methods: {
    handleChange (v) {
      this.$NMessage.info('value: ' + v)
    }
  }
}
</script>
