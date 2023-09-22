<markdown>
  # Dynamic size
</markdown>

<template>
  <n-virtual-list style="max-height: 240px" :item-size="42" :items="items">
    <template #default="{ item, index }">
      <div :key="item.key" class="item">
        <img class="avatar" :src="item.avatar" alt="">
        <span> {{ index }} - {{ item.message }}</span>
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

    const messages = [
      'Life is like a grand magic show, we sometimes play the magician, and sometimes become the audience to be teased, and finally found that the biggest magic is actually time, it makes our youth and wallet have become lost',
      "Complexity isn't going away, it's just going to shift, and when you hear people talking about elaborate conceptual models, stay awake.",
      "When it comes to virtual lists, it can make you feel like the list is infinite, but in reality it is just secretly hiding the invisible elements, like a lazy programmer with a blank note saying, You can't see me, and I won't load myself!",
      'Hemingway read the sea and found that life is a fish that takes a lifetime to catch. Van Gogh read the wheat fields and found that art hid behind the sun to cool itself. Freud read dreams and discovered a secret passage to the unconscious mind. Rodin read the human body and discovered beautiful coastlines that Columbus had not. Camus reads Kafka and finds that the truth has been half told'
    ]

    const items = Array.from({ length: 10000 }, (_, i) => ({
      key: i,
      value: i,
      avatar: avatars[i % avatars.length],
      message: messages[Math.floor(Math.random() * messages.length)]
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
  padding: 10px;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
