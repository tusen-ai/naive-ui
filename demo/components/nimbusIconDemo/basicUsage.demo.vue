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
      <n-nimbus-icon
        type="share"
        :size="24"
      />
      <n-nimbus-icon
        type="ban"
        :size="24"
      />
      <n-nimbus-icon
        type="pull-request"
        :size="24"
        color="#63E2B7"
      />
      <n-nimbus-icon
        type="operate"
        :size="24"
        color="#63E2B7"
      />
      <n-nimbus-icon
        :size="24"
        type="edit"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Valid type: share, ban, pull-request, operate, edit</pre>
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

<!--STYLE_EXAMPLE_START-->
<style
  lang="scss"
  scoped
>
.n-nimbus-icon-ban /deep/ g {
  fill: red;
  transition: fill .3s ease-in-out;
}

.n-nimbus-icon-ban:hover /deep/ g {
  fill: green;
}
</style>
<!--STYLE_EXAMPLE_END-->
