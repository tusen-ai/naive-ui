<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-modal v-model="isActive">
        <template v-slot:activator>
          <n-button
            size="small"
            @click="isActive = true"
          >
            Start Me up
          </n-button>
        </template>
        <div style="background: #5C657EFF; padding: 24px; border-radius: 8px;">
          <div>If you start me up, If you start me up, I'll never stop.</div>
          <n-input v-model="inputValue" />
          inputValue: {{ inputValue }}<br>
          <n-button
            size="small"
            @click="isActive = false"
          >
            Close it
          </n-button>
        </div>
      </n-modal>
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
      isActive: false,
      inputValue: ''
    }
  }
}
</script>
