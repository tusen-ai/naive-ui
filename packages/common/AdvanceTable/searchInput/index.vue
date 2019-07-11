<template>
  <div>
    <n-select
      v-if="options && options.columns"
      v-model="selectedValue"
      size="small"
      style="width:176px;margin-right:16px;"
      placeholder="Please Select Type"
      :items="options.columns"
    />
    <n-input
      v-model="value"
      type="input"
      size="small"
      icon="ios-search"
      round
      :placeholder="options.placeholder || 'Search something...'"
      style="width:240px; display:inline-block;"
      @input="handleInputChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      /**
       * {columns:{label,value}}
       */
      type: Object,
      default: null
    }
  },
  data () {
    return {
      timer: null,
      value: '',
      selectedValue: this.options.columns ? this.options.columns[0].value : null
    }
  },
  methods: {
    handleInputChange () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('on-change', { key: this.selectedValue, word: this.value })
      }, 300)
    }
  }
}
</script>
