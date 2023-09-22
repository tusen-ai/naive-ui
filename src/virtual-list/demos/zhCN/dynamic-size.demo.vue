<markdown>
  # 动态尺寸
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
      '生活就像一场盛大的魔术表演，我们时而扮演着魔术师，时而又成了被戏弄的观众，最后发现，最大的魔术其实是时间，它把我们的青春和钱包都变得不见了',
      'Naive UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接，顺便一提，你不需要导入任何 CSS 就能让组件正常工作',
      '复杂度不会消失，只会转移，当你听到一些人对于精致的概念模型侃侃而谈，请保持清醒。',
      '当谈到虚拟列表时，能让你感觉列表像是无限长的，但实际上它只是在偷偷隐藏那些不可见的元素，就像是个懒惰的程序员拿着一个空白纸条说：“你看不见我，我也不会加载自己！”',
      '海明威阅读海，发现生命是一条要花一辈子才会上钩的鱼。凡高阅读麦田，发现艺术躲在太阳的背后乘凉。弗洛伊德阅读梦，发现一条直达潜意识的秘密通道。罗丹阅读人体，发现哥伦布没有发现的美丽海岸线。加缪阅读卡夫卡，发现真已经被讲完一半'
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
