<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      DateTime Range
    </div>
    <div class="n-doc-section__view" style="flex-wrap: wrap">
      <!--EXAMPLE_START-->
      <n-base-suffix clearable :show="show" />
      <n-base-suffix :show="show" disabled arrow :active="active" />
      <n-base-suffix :show="show" :active="active" arrow clearable />
      <n-base-suffix :active="!active" :show="show" arrow />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">
      <n-button @click="toggleActive">toggleActive</n-button><n-button @click="toggleShow">toggleShow</n-button>
    </pre>
    <pre>
      <!--SOURCE-->
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      show: true
    }
  },
  methods: {
    toggleActive () {
      this.active = !this.active
    },
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>
