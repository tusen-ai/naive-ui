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
    setSearch ({ key, value }) {
      this.value = value
      this.selectedValue = key
      this.handleInputChange()
    },
    handleInputChange () {
      this.$emit('on-change', { key: this.selectedValue, word: this.value })
    }
  }
}
</script>
