<markdown>
# 软换行
</markdown>

<template>
  <div>
    <n-code :code="code" language="html" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: `
        <p class="n-p" data-v-79af885b="" style="--n-bezier:cubic-bezier(0.4, 0, 0.2, 1); --n-font-size:14px; --n-line-height:1.6; --n-text-color:rgb(51, 54, 57); font-size: 16px; margin-top: 0px; margin-bottom: 0px;">还是得再学习一个</p>
      `
    }
  }
})
</script>
