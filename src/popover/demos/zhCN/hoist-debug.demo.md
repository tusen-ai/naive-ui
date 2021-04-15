# Hoist Debug

```html
Style is the only prop of button and it's static, so the props of button vNode
is hoisted. Every button shares the same vNode props.
<n-popselect v-for="i in 3" :options="options">
  <button style="color: red;">{{ i }}</button>
</n-popselect>
```

```js
export default {
  setup () {
    return {
      options: [
        {
          label: '123',
          value: '123'
        }
      ]
    }
  }
}
```
