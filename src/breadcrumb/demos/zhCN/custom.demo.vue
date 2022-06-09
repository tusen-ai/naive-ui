<markdown>
# 下拉菜单

和下拉菜单一起使用。
</markdown>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-dropdown :options="options1">
        <div class="trigger">
          I'm ok
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-dropdown :options="options2">
        <div class="trigger">
          I'm ok
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options1: [
        {
          label: 'David Tao',
          key: 1
        },
        {
          label: '黑色柳丁',
          key: 2
        }
      ],
      options2: [
        {
          label: '小镇姑娘',
          key: 1
        },
        {
          label: '普通朋友',
          key: 2
        }
      ]
    }
  }
})
</script>

<style>
.trigger {
  padding: 4px;
  margin: -4px;
  border-radius: inherit;
}
</style>
