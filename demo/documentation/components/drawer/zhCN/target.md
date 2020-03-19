# 显示在指定区域
```html
<n-button-group>
  <n-button @click="activate('top')">上</n-button>
  <n-button @click="activate('right')">右</n-button>
  <n-button @click="activate('bottom')">下</n-button>
  <n-button @click="activate('left')">左</n-button>
</n-button-group>
<div 
  ref="target"
  style="position:relative;
    width:500px;
    height:500px;
    border:1px solid rgba(0, 0, 0, .1);
    margin-top: 10px;"
>
  <p style="position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);">
    显示区域
  </p>
</div>
<n-drawer v-model="active" :width="200" :placement="placement" :target="target">
  <n-h1>斯通纳</n-h1>
  <n-p>《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。</n-p>
</n-drawer>
```
```js
export default {
  data () {
    return {
      active: false,
      placement: 'right'
    }
  },
  methods: {
    activate (placement) {
      this.active = true
      this.placement = placement
    },
    target () {
      return this.$refs.target
    }
  }
}
```