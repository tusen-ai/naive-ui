<markdown>
  # 基础尺寸
</markdown>

<template>
  <n-virtual-list style="max-height: 240px" :item-size="42" :items="items">
    <template #default="{ item }">
      <div :key="item.key" class="item" style="height: 42px">
        <img class="avatar" :src="item.avatar" alt="">
        <span> {{ item.value }}</span>
      </div>
    </template>
  </n-virtual-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    const avatars = [
      'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      'https://avatars.githubusercontent.com/u/20943608?s=60&v=4',
      'https://avatars.githubusercontent.com/u/46394163?s=60&v=4',
      'https://avatars.githubusercontent.com/u/39197136?s=60&v=4',
      'https://avatars.githubusercontent.com/u/19239641?s=60&v=4'
    ]

    const items = Array.from({ length: 10000 }, (_, i) => ({
      key: `${i}`,
      value: i,
      avatar: avatars[i % avatars.length]
    }))

    return {
      items
    }
  }
})
</script>
<style>
.item {
  display: flex;
  align-items: center;
}
.avatar {
  width: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
