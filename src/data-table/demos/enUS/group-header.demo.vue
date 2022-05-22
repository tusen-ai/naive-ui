<markdown>
# Grouped header
</markdown>

<template>
  <n-data-table
    :data="data"
    :columns="columns"
    :single-line="false"
    :pagination="pagination"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createCols () {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Attrs',
      key: 'attrs',
      children: [
        {
          title: 'Attack',
          key: 'attack',
          children: [
            {
              title: 'Physics Attack',
              key: 'physicsAttack'
            },
            {
              title: 'Magic Attack',
              key: 'magicAttack'
            }
          ]
        },
        {
          title: 'Defend',
          key: 'defend'
        },
        {
          title: 'Speed',
          key: 'speed'
        }
      ]
    }
  ]
}

function createData () {
  return Array.from({ length: 50 }).map((_, i) => {
    return {
      key: i,
      name: `name_${i}`,
      physicsAttack: `physicsAttack_${i}`,
      magicAttack: `magicAttack_${i}`,
      defend: `defend_${i}`,
      speed: `speed_${i}`
    }
  })
}

export default defineComponent({
  setup () {
    return {
      data: ref(createData()),
      columns: ref(createCols()),
      pagination: ref({
        pageSize: 10
      })
    }
  }
})
</script>
