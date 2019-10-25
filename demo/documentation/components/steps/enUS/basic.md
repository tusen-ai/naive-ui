# Basic
```html
<n-steps
  :current="current"
  :status="currentStatus"
>
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
<div
  style="display: flex; justify-content: center; flex-wrap: wrap; margin-top: 48px;"
>
  <n-button
    @click="prev"
  >
    <template v-slot:icon>
      <md-arrow-round-back />
    </template>
  </n-button>
  <n-button
    @click="next"
  >
    <template v-slot:icon>
      <md-arrow-round-forward />
    </template>
  </n-button>
  <n-button @click="currentStatus='error'">
    current-status: error
  </n-button>
  <n-button @click="currentStatus='process'">
    current-status: process
  </n-button>
</div>
```

```js
import mdArrowRoundBack from 'naive-ui/packages/icons/md-arrow-round-back'
import mdArrowRoundForward from 'naive-ui/packages/icons/md-arrow-round-forward'

export default {
  components: {
    mdArrowRoundBack,
    mdArrowRoundForward
  },
  data () {
    return {
      current: null,
      currentStatus: 'error'
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