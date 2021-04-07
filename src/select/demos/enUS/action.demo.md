# Action Slot

Is there anybody needs action slot on select menu?

```html
<n-select v-model:value="value" :options="options">
  <template #action>If you open this demo, you may need it.</template>
</n-select>
```

```js
export default {
  data () {
    return {
      value: null,
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        }
      ]
    }
  }
}
```
