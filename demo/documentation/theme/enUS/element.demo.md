# Use Naive Element

Naive UI has `n-element` component. See [Element](n-element).

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">Dark</n-button>
    <n-button @click="theme = 'light'">Light</n-button>
  </n-space>
  <n-config-provider :theme="theme">
    <n-card>
      <n-el tag="span" class="oops"> I am a span </n-el>
    </n-card>
  </n-config-provider>
</n-space>
```

```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  }
}
```

```css
.oops {
  color: #000;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.oops.n-light-theme {
  color: green;
}
.oops.n-dark-theme {
  color: aquamarine;
}
```
