# Use Naive Element
Naive UI has `n-element` component. See [Element](n-element).
```html
<div>
  <n-button @click="theme = 'dark'">Dark</n-button>
  <n-button @click="theme = 'light'">Light</n-button>
</div>
<n-config-provider :theme="theme">
  <n-card>
    <n-el tag="span" class="oops">
      I am a span
    </n-el>
  </n-card>
</n-config-provider>
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
  transition: color .3s cubic-bezier(.4, 0, .2, 1);
}
.oops.n-light-theme {
  color: green
}
.oops.n-dark-theme {
  color: aquamarine
}
.n-button {
  margin: 0 12px 8px 0;
}
```