<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Clearable
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-input
        v-model="value"
        type="input"
        placeholder="Stairway to Heaven"
        round
        clearable
      />
      <n-input
        v-model="value"
        type="password"
        placeholder="Stairway to Heaven"
        round
        clearable
      />
      <n-input
        v-model="value"
        type="textarea"
        placeholder="Stairway to Heaven"
        round
        clearable
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">{{ JSON.stringify(value) }}</pre>
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
