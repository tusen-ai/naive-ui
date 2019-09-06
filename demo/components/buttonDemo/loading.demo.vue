<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Loading
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-button
        :loading="loading"
        @click="loading = !loading"
      >
        Loading
      </n-button>
      <n-button
        :loading="loading"
        icon-position="right"
        @click="loading = !loading"
      >
        Loading
      </n-button>
      <n-button
        :loading="loading"
        size="small"
        @click="loading = !loading"
      >
        Loading
      </n-button>
      <n-button
        :loading="loading"
        size="large"
        @click="loading = !loading"
      >
        Loading
      </n-button>
      <n-button
        :loading="loading"
        type="primary"
        size="large"
        round
        @click="loading = !loading"
      >
        Loading
      </n-button>
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
      loading: false
    }
  }
}
</script>
