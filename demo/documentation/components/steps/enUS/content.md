# Custom
```html
<n-steps
  :current="current"
  :status="currentStatus"
>
  <n-step title="I Me Mine">
    <div class="n-step-description">
      <p>Al through the day, I me mine I me mine, I me mine</p>
      <n-button :type="current === 1 ? currentStatus : null" size="small" @click="handleButton1Click">click me</n-button>
    </div>
  </n-step>
  <n-step title="Let It Be">
    <div class="n-step-description">
      <p>When I find myself in times of trouble Mother Mary comes to me</p>
      <n-button :type="current === 2 ? currentStatus : null" size="small" @click="handleButton2Click">click me</n-button>
    </div>
  </n-step>
  <n-step title="Come Together">
    <div class="n-step-description">
      <p>Here come old flat top He come grooving up slowly</p>
      <n-button :type="current === 3 ? currentStatus : null" size="small" @click="handleButton3Click">click me</n-button>
    </div>
  </n-step>
  <n-step title="Something">
    <div class="n-step-description">
      <p>Something in the way she moves Attracts me like no other lover</p>
      <n-button :type="current === 4 ? currentStatus : null" size="small" @click="handleButton4Click">click me</n-button>
    </div>
  </n-step>
</n-steps>

<n-radio-group v-model="currentStatus" size="medium" name="basic">
  <n-radio-button value="error">
    Error
  </n-radio-button>
  <n-radio-button value="success">
    Process
  </n-radio-button>
  <n-radio-button value="warning">
    Wait
  </n-radio-button>
  <n-radio-button  value="primary">
    Finish
  </n-radio-button>
</n-radio-group>
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
      current: 1,
      currentStatus: 'error'
    }
  },
  methods: {
    handleButton1Click() {
      if(this.current === 1) {
        console.log('click 1, do something')
        this.current++
      }
    },
    handleButton2Click() {
      if(this.current === 2) {
        console.log('click 2, do something')
        this.current++
      }
    },
    handleButton3Click() {
      if(this.current === 3) {
        console.log('click 3, do something')
        this.current++
      }
    },
    handleButton4Click() {
      if(this.current === 4) {
        console.log('click 4, do something')
        this.current = 1
      }
    }
  }
}
```

```css
.n-radio-group {
  margin: 8px 16px 8px 0;
}
```