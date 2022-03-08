<markdown>
# Customize option props

Bind whatever you want.
</markdown>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button> Go For a Trip </n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'marina bay sands',
          props: {
            onClick: () => {
              message.success('Good!')
            }
          }
        },
        {
          label: "Brown's Hotel, London",
          key: "brown's hotel, london",
          children: [
            {
              label: 'Chicken',
              key: 'chicken',
              disabled: true,
              props: {
                onClick: () => {
                  message.info('Okay')
                }
              }
            },
            {
              label: 'Beef',
              key: 'beef'
            }
          ]
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'atlantis nahamas, nassau',
          props: {
            onMousedown: () => {
              message.warning('Key down')
            }
          }
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
