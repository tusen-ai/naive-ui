<markdown>
# Customize option props

Bind whatever you want.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
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
          label: 'Brown\'s Hotel, London',
          key: 'brown\'s hotel, london',
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
      handleSelect(key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button> Go For a Trip </n-button>
  </n-dropdown>
</template>
