<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      DateTime Range
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-base-cancel-mark
        clearable
        :show="show"
      />
      <n-base-cancel-mark
        :show="show"
        disabled
        arrow
        :active="active"
      />
      <n-base-cancel-mark
        :show="show"
        :active="active"
        arrow
        clearable
      />
      <n-base-cancel-mark
        :active="!active"
        :show="show"
        arrow
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">
      <n-button @click="toggleActive">toggleActive</n-button><n-button @click="toggleShow">toggleShow</n-button>
    </pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
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
