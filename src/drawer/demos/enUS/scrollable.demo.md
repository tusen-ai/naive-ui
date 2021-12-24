# Scrollable

```html
<n-button-group>
  <n-button @click="handleNativeScroll">Native Scroll</n-button>
  <n-button @click="handleNaiveScroll">Naive Scroll</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502" :height="200" :native-scrollbar="nativeScrollbar" placement='top'>
  <n-drawer-content>
    <template #header>Header</template>
    <template #footer>
      <n-button>Footer</n-button>
    </template>
    Stoner is a 1965 novel by the American writer John Williams.
    Stoner tells the most important parts of life: love, identification, compassion, ambition, pride, trust and death.
　　 A life that a brave man has failed without frustration: Even if he can't have a perfect life, fortunately, he pursues a complete self.

　　But you are smart enough-but only smart enough-to realize what will happen to you in this world. You are cut off from the world because of failure, you know this. Although you are capable of being a jerk, you are not ruthless enough to be persistent enough. Although you are not exactly the most honest person I know, you do not have that unusual insincerity. On the one hand, you have the ability to work, but you are too lazy and not diligent enough to reach the level the world wants you to achieve. On the other hand, you are not so lazy, and you give the world an impression, a feeling that you are very important. You are unlucky—really unlucky. You can't see the rising halo from your body, you always have a confused expression. In this world, you are always on the verge of success, and you will be ruined by your own shortcomings. So, you were selected and singled out; God’s will, its sense of humor often makes me feel very interesting, God has caught you from the big mouth of this world, put it here safely, among your brothers .
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
