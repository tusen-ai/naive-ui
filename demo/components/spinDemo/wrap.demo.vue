<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Wrap
    </div>
    <div
      class="n-doc-section__view"
      style="align-items: flex-start;"
    >
      <!--EXAMPLE_START-->
      <n-spin
        size="in-small"
        :spinning="spinning"
      >
        <n-button size="small">
          Small Spin
        </n-button>
      </n-spin>
      <n-spin
        size="in-medium"
        :spinning="spinning"
      >
        <n-button size="medium">
          Medium Spin
        </n-button>
      </n-spin>
      <n-spin
        size="in-large"
        :spinning="spinning"
      >
        <n-button size="large">
          Large Spin
        </n-button>
      </n-spin>
      <n-spin :spinning="spinning">
        <n-alert
          title="Success Text"
          type="success"
        >
          Leave it till tomorrow to unpack my case
        </n-alert>
      </n-spin>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect"><n-button @click="spinning = !spinning">spin</n-button></pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      spinning: false
    }
  }
}
</script>
