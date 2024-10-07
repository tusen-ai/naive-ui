<markdown>
# Async

Dialog can be async.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDialog } from 'naive-ui'

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))
const countDown = (second: number) => `Count down ${second} second`

export default defineComponent({
  setup() {
    const dialog = useDialog()

    const isLoading = ref(false)
    const titleText = ref('tuk-tuk')
    const dialogText = ref('Click and count down 3 second')
    const positiveText = ref('Wait!')

    async function handleWait() {
      isLoading.value = true
      titleText.value = 'tuk-tuk-tuk...'
      positiveText.value = 'Waiting...'
      return new Promise((resolve) => {
        sleep()
          .then(() => {
            dialogText.value = countDown(2)
            return sleep()
          })
          .then(() => {
            dialogText.value = countDown(1)
            return sleep()
          })
          .then(() => {
            isLoading.value = false
            dialogText.value = countDown(0)
          })
          .then(resolve)
      })
    }

    return {
      handleClick() {
        const d = dialog.success({
          title: 'Async',
          content: 'Click and count down 3 second',
          positiveText: 'Confirm',
          onPositiveClick: () => {
            d.loading = true
            return new Promise((resolve) => {
              sleep()
                .then(() => {
                  d.content = countDown(2)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(1)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(0)
                })
                .then(resolve)
            })
          }
        })
      },
      handleReactiveDialogClick() {
        titleText.value = 'tuk-tuk'
        dialogText.value = 'Click and count down 3 second'
        positiveText.value = 'Wait!'
        dialog.info({
          title: titleText,
          content: dialogText,
          loading: isLoading,
          positiveText,
          onPositiveClick: async () => await handleWait()
        })
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-button @click="handleReactiveDialogClick">
      Wait!
    </n-button>
    <n-button @click="handleClick">
      Success
    </n-button>
  </n-space>
</template>
