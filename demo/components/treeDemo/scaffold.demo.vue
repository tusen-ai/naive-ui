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
      <n-tree
        ref="tree"
        :data="data"
      /> <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-button @click="handleClick">
        dragEnter
      </n-button>
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
import { setTimeout } from 'timers'

let key = 0

function genData (layer = 2, depth = 0, prefix = '') {
  if (layer === depth) return
  const data = []
  const count = 2
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
  },
  methods: {
    handleClick () {
      this.$refs.tree.handleDragStart({
        key: 0,
        isLeaf: false
      })
      setTimeout(() => {
        this.$refs.tree.handleDragEnter({
          key: 85,
          isLeaf: false
        })
      }, 100)
    }
  }
}
</script>
