<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-drawer v-model="active">
        777
      </n-drawer>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect"><n-button @click="active = !active">active</n-button></pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  }
}
</script>
