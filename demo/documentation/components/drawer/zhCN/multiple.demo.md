# 多个抽屉

```html
<n-button @click="activate">来一个</n-button>
<n-drawer v-model:show="active" :width="502">
  <n-h1>斯通纳</n-h1>
  <n-p>《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。</n-p>
  <n-button @click="innerActivate">再来个抽屉</n-button>
  <n-drawer v-model:show="innerActive" :width="251">
    <n-h1>斯通纳</n-h1>
    <n-p>《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。</n-p>
  </n-drawer>
</n-drawer>
```

```js
export default {
  data() {
    return {
      active: false,
      innerActive: false
    }
  },
  methods: {
    activate() {
      this.active = true
    },
    innerActivate() {
      this.innerActive = true
    }
  }
}
```
