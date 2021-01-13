<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Multiple
    </div>
    <div class="n-doc-section__view" style="flex-wrap: nowrap">
      <!--EXAMPLE_START-->
      <n-cascader
        v-model="value"
        multiple
        placeholder="Please Select Something"
        :options="options"
        style="flex-grow: 1; margin-right: 12px"
        lazy
        :on-load="handleLoad"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">
v-model: {{ JSON.stringify(value) }}</pre>
    <pre>
      <!--SOURCE-->
    </pre>
  </div>
</template>

<script>
function genChildren (option) {
  const children = []
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: option.label + '_' + i,
      value: option.label + '_' + i,
      isLeaf: option.depth === 3
    })
  }
  return children
}

const options = [
  {
    label: 'China',
    value: 'china',
    isLeaf: false
  }
]

export default {
  data () {
    return {
      value: null,
      options: options
    }
  },
  methods: {
    handleLoad (option, resolve) {
      console.log(option)
      window.setTimeout(() => {
        resolve(genChildren(option))
      }, 1000)
    }
  }
}
</script>
