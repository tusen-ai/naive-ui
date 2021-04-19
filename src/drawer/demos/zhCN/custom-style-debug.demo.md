# Style Debug

```html
<n-button-group>
  <n-button @click="activate('top')">上</n-button>
  <n-button @click="activate('right')">右</n-button>
  <n-button @click="activate('bottom')">下</n-button>
  <n-button @click="activate('left')">左</n-button>
</n-button-group>
<n-drawer
  v-model:show="active"
  :placement="placement"
  style="border: 2px solid red;"
  content-style="border: 2px solid green;"
>
  <n-drawer-content title="斯通纳">
    《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
  </n-drawer-content>
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
    }
  }
}
```
