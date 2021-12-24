# 可滚动

```html
<n-button-group>
  <n-button @click="handleNativeScroll">原生滚动</n-button>
  <n-button @click="handleNaiveScroll">Naive 滚动</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502" :height="200" :native-scrollbar="nativeScrollbar" placement='top'>
  <n-drawer-content>
    <template #header>Header</template>
    <template #footer>
      <n-button>Footer</n-button>
    </template>
    《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    《斯通纳》讲述了生命中至为重要的部分：爱，认同，怜悯，志业，傲骨，信任与死亡。

　　可是你也够聪明——但只是够聪明——意识到在这个世界上自己会怎么样。你因为失败而与世隔绝，你知道这个。虽然你有能力当个混账家伙，可是你不够无情到坚持不懈地当下去。虽然你不完全是我认识的最诚实的人，你也没有那种异常的不真诚。一方面，你有工作能力，可是你又太懒，工作不够勤勉，达不到这个世界要你达到的程度。另一方面，你又并不那么懒惰，你又给世人一种印象，一种你很重要的感觉。你并不走运——真的不走运。从你的身上看不到升起的光环，你总是带着副迷茫的表情。在这个世界上，你总是处于成功的边缘，你会被自己的缺点毁掉。所以，你被选中，被挑出来；天意，它的幽默感经常让我觉得很有意思，老天已经把你从这个世界的大嘴里抓出来，安全地放在这儿，放在你的兄弟中间。
  </n-drawer-content>
</n-drawer>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const active = ref(false)
    const nativeScrollbar = ref(true)
    const handleNativeScroll = () => {
      active.value = true
      nativeScrollbar.value = true
    }
    const handleNaiveScroll = () => {
      active.value = true
      nativeScrollbar.value = false
    }
    return {
      active,
      handleNativeScroll,
      handleNaiveScroll,
      nativeScrollbar
    }
  }
})
```
