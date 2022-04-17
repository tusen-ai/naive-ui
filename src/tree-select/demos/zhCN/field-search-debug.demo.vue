<markdown>
# Field search debug
</markdown>

<template>
  <div>
    有问题
    <n-tree-select
      :options="options1"
      label-field="name"
      key-field="id"
      children-field="subs"
      filterable
    />
    没问题
    <n-tree-select :options="options2" filterable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NTreeSelect } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NTreeSelect
  },
  setup () {
    return {
      options1: [
        {
          name: 'label',
          id: 'value',
          subs: [{ name: 'child1', id: 'child1id' }]
        }
      ],
      options2: [
        {
          label: 'label',
          key: 'value',
          children: [{ label: 'child1', key: 'child1id' }]
        }
      ]
    }
  }
})
</script>
