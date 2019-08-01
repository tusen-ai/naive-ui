<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Type
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-alert
        title="Info Text"
        type="info"
      >
        Gee it's good to be back home
      </n-alert>
      <n-alert
        title="Success Text"
        type="success"
      >
        Leave it till tomorrow to unpack my case
      </n-alert>
      <n-alert
        title="Warning Text"
        type="warning"
      >
        Honey disconnect the phone
      </n-alert>
      <n-alert
        title="Error Text"
        type="error"
      >
        I'm back in the U.S.S.R.
      </n-alert>
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
    }
  }
}
</script>
