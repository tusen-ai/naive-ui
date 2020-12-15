# Basic

```html
<n-space vertical>
  <n-steps :current="current" :status="currentStatus">
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
        <template v-slot:icon>
          <md-arrow-round-back />
        </template>
      </n-button>
      <n-button @click="next">
        <template v-slot:icon>
          <md-arrow-round-forward />
        </template>
      </n-button>
    </n-button-group>
    <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
      <n-radio-button value="error"> Error </n-radio-button>
      <n-radio-button value="process"> Process </n-radio-button>
      <n-radio-button value="wait"> Wait </n-radio-button>
      <n-radio-button value="finish"> Finish </n-radio-button>
    </n-radio-group>
  </n-space>
</n-space>
```

```js
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons-v4'

export default {
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward
  },
  data () {
    return {
      current: 1,
      currentStatus: 'process'
    }
  },
  methods: {
    next () {
      if (this.current === null) this.current = 1
      else if (this.current >= 4) this.current = null
      else this.current++
    },
    prev () {
      if (this.current === 0) this.current = null
      else if (this.current === null) this.current = 4
      else this.current--
    }
  }
}
```
