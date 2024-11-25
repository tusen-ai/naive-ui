<markdown>
# Field search debug
</markdown>

<script lang="ts">
import { NTreeSelect } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    NTreeSelect
  },
  setup() {
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

<template>
  <div>
    有问题
    <NTreeSelect
      :options="options1"
      label-field="name"
      key-field="id"
      children-field="subs"
      filterable
    />
    没问题
    <NTreeSelect :options="options2" filterable />
  </div>
</template>
