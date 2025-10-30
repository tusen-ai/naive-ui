<markdown>
# Custom Option Props

Bind anything you want.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
const options = [
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
]

function handleSelect(key: string | number) {
  message.info(String(key))
}
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>Go For a Trip</n-button>
  </n-dropdown>
</template>
