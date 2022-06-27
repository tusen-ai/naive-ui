<markdown>
# 自定义placeholder

只对 `type="textarea"` 有效
</markdown>

<template>
  <n-space vertical>
    <n-input type="textarea">
      <template #placeholder>
        纯文字？
      </template>
    </n-input>
    <n-input type="textarea">
      <template #placeholder>
        <n-space :size="0">
          <n-text depth="3">
            图标
          </n-text>
          <n-icon :size="16" :component="Glasses" />
          <n-text depth="3">
            文字共同使用
          </n-text>
        </n-space>
      </template>
    </n-input>
    <n-input type="textarea">
      <template #placeholder>
        <n-space :size="0">
          <n-text depth="3">
            我是
          </n-text>
          <n-text depth="1" type="error" underline>
            重点
          </n-text>
          <n-text depth="3">
            内容哦
          </n-text>
        </n-space>
      </template>
    </n-input>
    <n-input :rows="5" type="textarea">
      <template #placeholder>
        <n-space :size="0" vertical>
          <n-text depth="1">
            最重新的是
          </n-text>
          <n-text depth="2">
            可以显示
          </n-text>
          <n-text depth="3">
            多行啦
          </n-text>
        </n-space>
      </template>
    </n-input>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Glasses } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      Glasses
    }
  }
})
</script>
