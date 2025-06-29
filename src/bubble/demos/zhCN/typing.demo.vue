<markdown>
# 打字器配置
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref(
  `听下面一段对话，每段对话有几个小题，从题中所给的A、B、C三个选项中选出最佳选项，并标在试卷的相应位置。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。例如，你有5秒钟的时间阅读试卷上的例题。`
)

function setContents() {
  content.value = '听下面一'
  setTimeout(() => {
    content.value = `听下面一段对话，每段对话有几个小题，从题中所给的A、B、C三个选项中选出最佳选项，并标在试卷的相应位置。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。例如，你有5秒钟的时间阅读试卷上的例题。`
  }, 1000)
}
</script>

<template>
  <n-button @click="setContents">
    重新加载内容
  </n-button>
  <n-bubble is-typing :content="content" />
  <n-bubble is-typing :content="content" :options="{
      interval: 5,
      step: 2,
    }">
    <template #content>
      <n-p>{{ content }}</n-p>
    </template>
  </n-bubble>
</template>
