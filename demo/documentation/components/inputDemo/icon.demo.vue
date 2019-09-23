<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Icon
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-input
        v-model="value"
        type="input"
        size="small"
        icon="ios-search"
      />
      <n-input
        v-model="value"
        type="input"
        icon="ios-search"
      />
      <n-input
        v-model="value"
        type="input"
        size="large"
        icon="md-settings"
      />
      <n-input
        v-model="value"
        type="input"
        size="small"
        icon="ios-search"
        round
      />
      <n-input
        v-model="value"
        type="input"
        icon="ios-search"
        round
      />
      <n-input
        v-model="value"
        type="input"
        size="large"
        icon="md-settings"
        round
      />
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
      value: null
    }
  }
}
</script>
