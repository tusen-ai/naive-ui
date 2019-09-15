<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-tree
        ref="tree"
        :data="data"
        checkable
      /> <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
let key = 0

function genData (layer = 4, depth = 0, prefix = '') {
  if (layer === depth) return
  const data = []
  const count = 4
  for (let i = 0; i < count; ++i) {
    data.push({
      label: `${prefix}_${i}`,
      key: key++,
      children: genData(layer, depth + 1, `${prefix}_${i}`)
    })
  }
  return data
}

export default {
  data () {
    return {
      data: genData()
    }
  }
}
</script>
