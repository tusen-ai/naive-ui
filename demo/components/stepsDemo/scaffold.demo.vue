<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Steps
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-steps :active="active">
        <n-step
          title="A B C D"
          description="Hello Go Go Go Go, Hello Go Go Go Go"
        />
        <n-step
          title="Create Trigger"
          description="Hello Go Go Go Go"
        />
        <n-step
          title="Basic Information"
          description="Hello Go Go Go Go, Hello Go Go Go Go"
        />
        <n-step
          title="Confirmation"
          description="Hello Go Go Go Go"
        />
      </n-steps>
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
      timerId: null,
      active: null
    }
  },
  mounted () {
    this.timerId = window.setInterval(() => {
      if (this.active === null) this.active = 0
      else if (this.active >= 3) this.active = null
      else this.active++
    }, 2000)
  },
  beforeDestroy () {
    window.clearInterval(this.timerId)
  }
}
</script>
