<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Event
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-input
        v-model="value"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
        @keyup="handleKeyUp"
        @input="handleInput"
      />
      <n-input
        v-model="value"
        disabled
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
        @keyup="handleKeyUp"
        @input="handleInput"
      />
      <n-input
        v-model="value"
        type="textarea"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
        @keyup="handleKeyUp"
        @input="handleInput"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
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
    handleFocus () {
      this.$NMessage.success('focus')
    },
    handleBlur () {
      this.$NMessage.success('blur')
    },
    handleChange (value) {
      this.$NMessage.success('change: ' + value)
    },
    handleKeyUp (e) {
      this.$NMessage.success('keyup')
    },
    handleInput (v) {
      this.$NMessage.success('input: ' + v)
    }
  }
}
</script>
