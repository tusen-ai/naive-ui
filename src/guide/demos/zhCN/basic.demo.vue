<markdown>
# 基础用法

通过多个高亮目标展示引导。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: '创建内容',
          content: '先创建一个草稿。',
          target: '#guide-basic-create'
        },
        {
          title: '保存修改',
          content: '发布前先保存当前工作。',
          target: '#guide-basic-save'
        },
        {
          title: '发布',
          content: '让内容对所有人可见。',
          target: '#guide-basic-publish'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-basic-create">
      创建
    </n-button>
    <n-button id="guide-basic-save">
      保存
    </n-button>
    <n-button id="guide-basic-publish">
      发布
    </n-button>
    <n-button @click="show = true">
      开始引导
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" />
</template>
