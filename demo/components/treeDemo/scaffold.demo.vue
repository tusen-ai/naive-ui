<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-tree :data="data" />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>

function genData (layer = 4, depth = 0, prefix = '') {
  if (layer === depth) return
  const data = []
  const count = 4
  for (let i = 0; i < count; ++i) {
    data.push({
      label: `${prefix}_${i}`,
      value: `${prefix}_${i}`,
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
