<markdown>
# 基本使用
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref(
  `Listen to the following dialogue. Each dialogue has several questions. Select the best option from the three given options A, B, and C in the question and mark it in the corresponding position on the test paper. After listening to each conversation, you have 10 seconds to answer the sub-questions and read the next one. Each dialogue is read only once. For example, you have five seconds to read the example questions on the test paper.`
)

function setContents() {
  content.value = ''
  setTimeout(() => {
    content.value = `Listen to the following dialogue. Each dialogue has several questions. Select the best option from the three given options A, B, and C in the question and mark it in the corresponding position on the test paper. After listening to each conversation, you have 10 seconds to answer the sub-questions and read the next one. Each dialogue is read only once. For example, you have five seconds to read the example questions on the test paper.`
  }, 1000)
}
</script>

<template>
  <n-button @click="setContents">
    Reload the content
  </n-button>
  <n-typewriter :content="content" />
</template>
