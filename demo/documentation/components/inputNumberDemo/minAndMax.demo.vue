<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Min and Max
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-input-number
        v-model="value"
        :min="-3"
        :max="5"
      />
      <n-input-number
        v-model="value"
        :min="-5"
        :max="3"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">value: {{ JSON.stringify(value) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  }
}
</script>
