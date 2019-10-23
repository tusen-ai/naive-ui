<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Use It in Button
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button size="small">
        <template v-slot:icon>
          <n-nimbus-icon
            type="share"
            color="#63E2B7"
          />
        </template>
        Pull Request
      </n-button>
      <n-button>
        <template v-slot:icon>
          <n-nimbus-icon
            type="share"
            color="#63E2B7"
          />
        </template>
        Pull Request
      </n-button>
      <n-button size="small">
        <template v-slot:icon>
          <n-nimbus-icon
            type="share"
            color="#63E2B7"
          />
        </template>
        Pull Request
      </n-button>
      <n-button icon-on-right>
        <template v-slot:icon>
          <n-nimbus-icon
            type="share"
            color="#63E2B7"
          />
        </template>
        Pull Request
      </n-button>
      <!--EXAMPLE_END-->
    </div>
    <pre>
      <!--SOURCE-->
    </pre>
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
