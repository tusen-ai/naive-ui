# Size
Steps has `small`, `medium` size.
```html
<n-steps
  size="small"
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
<n-button-group>
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
</n-button-group>
<n-button-group>
  <n-button @click="currentStatus='error'">
    current error
  </n-button>
  <n-button @click="currentStatus='process'">
    current process
  </n-button>
  <n-button @click="currentStatus='wait'">
    current wait
  </n-button>
  <n-button @click="currentStatus='finish'">
    current finish
  </n-button>
</n-button-group>
```

```js
import mdArrowRoundBack from 'naive-ui/lib/icons/md-arrow-round-back'
import mdArrowRoundForward from 'naive-ui/lib/icons/md-arrow-round-forward'

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

```css
.n-button-group {
  margin: 8px 16px 8px 0;
}
```