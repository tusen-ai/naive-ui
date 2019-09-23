<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Single Lazy
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-cascader
        v-model="value"
        placeholder="Please Select Something"
        style="flex-grow: 1; margin-right: 12px;"
        lazy
        :on-load="handleLoad"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ JSON.stringify(value) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
function genChildren (option) {
  const children = []
  const label = option.label || 'root'
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: label + '_' + i,
      value: label + '_' + i,
      isLeaf: option.depth === 3
    })
  }
  return children
}

export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    handleLoad (option, resolve) {
      window.setTimeout(() => {
        resolve(genChildren(option))
      }, 1000)
    }
  }
}
</script>
