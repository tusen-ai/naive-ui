# 尺寸

有 `small` 和 `medium` 大小。

```html
<n-space vertical>
  <n-steps size="small" :current="current" :status="currentStatus">
    <n-step
      title="I Me Mine"
      description="All through the day, I me mine I me mine, I me mine"
    />
    <n-step
      title="Let It Be"
      description="When I find myself in times of trouble Mother Mary comes to me"
    />
    <n-step
      title="Come Together"
      description="Here come old flat top He come grooving up slowly"
    />
    <n-step
      title="Something"
      description="Something in the way she moves Attracts me like no other lover"
    />
  </n-steps>
  <n-space>
    <n-button-group>
      <n-button @click="prev">
        <template #icon>
          <n-icon>
            <md-arrow-round-back />
          </n-icon>
        </template>
      </n-button>
      <n-button @click="next">
        <template #icon>
          <n-icon>
            <md-arrow-round-forward />
          </n-icon>
        </template>
      </n-button>
    </n-button-group>
    <n-radio-group v-model:value="currentStatus" size="medium" name="size">
      <n-radio-button value="error"> Error </n-radio-button>
      <n-radio-button value="process"> Process </n-radio-button>
      <n-radio-button value="wait"> Wait </n-radio-button>
      <n-radio-button value="finish"> Finish </n-radio-button>
    </n-radio-group>
  </n-space>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward
  },
  setup () {
    const current = ref(1)
    function next () {
      if (current.value === null) current.value = 1
      else if (current.value >= 4) current.value = null
      else current.value++
    }
    function prev () {
      if (current.value === 0) current.value = null
      else if (current.value === null) current.value = 4
      else current.value--
    }
    return {
      currentStatus: ref('process'),
      current,
      next,
      prev
    }
  }
})
```
