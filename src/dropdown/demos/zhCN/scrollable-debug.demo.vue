<markdown>
# Scrollable debug
</markdown>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    scrollable
    :menu-props="menuProps"
  >
    <n-button>Scrollable</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DropdownMenuProps } from 'naive-ui'

const options = [
  {
    label: '1',
    key: '1'
  },
  {
    label: '2',
    key: '2'
  },
  {
    label: '3',
    key: '3'
  },
  {
    label: '4',
    key: '4'
  },
  {
    label: '5',
    key: '5'
  },
  {
    label: '6',
    key: '6'
  },
  {
    label: '7',
    key: '7',
    children: [
      {
        label: '11',
        key: '11'
      },
      {
        label: '12',
        key: '12'
      },
      {
        label: '13',
        key: '13'
      },
      {
        label: '14',
        key: '14'
      },
      {
        label: '15',
        key: '15'
      },
      {
        label: '16',
        key: '16'
      },
      {
        label: '17',
        key: '17',
        children: [
          {
            label: '21',
            key: '21'
          },
          {
            label: '22',
            key: '22'
          },
          {
            label: '23',
            key: '23'
          },
          {
            label: '24',
            key: '24'
          },
          {
            label: '25',
            key: '25'
          },
          {
            label: '26',
            key: '26'
          },
          {
            label: '27',
            key: '27'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const menuProps: DropdownMenuProps = (option, options) => {
      console.log(option, options)
      return { style: 'max-height: 200px;' }
    }
    return {
      options,
      menuProps
    }
  }
})
</script>
