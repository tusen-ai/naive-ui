# Basic

```html
<n-space>
  <n-radio
    :checked="checkedValue === 'Definitely Maybe'"
    @change="handleChange"
    value="Definitely Maybe"
    name="basic-demo"
  >
    Definitely Maybe
  </n-radio>
  <n-radio
    :checked="checkedValue === 'Be Here Now'"
    @change="handleChange"
    value="Be Here Now"
    name="basic-demo"
  >
    Be Here Now
  </n-radio>
  <n-radio
    :checked="checkedValue === 'Be Here Now'"
    @change="handleChange"
    value="Be Here Now"
    :disabled="disabled"
    name="basic-demo"
  >
    Be Here Now
  </n-radio>
  <n-switch v-model:value="disabled" />
</n-space>
```

```js
export default {
  data() {
    return {
      disabled: true,
      checkedValue: null
    }
  },
  methods: {
    handleChange(e) {
      this.checkedValue = e.target.value
    }
  }
}
```
