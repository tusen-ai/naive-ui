# Use Naive Element
Naive UI has `n-element` component. See [Element](n-element).
```html
<n-config-provider :theme="theme">
  <div style="background-color: rgba(128, 128, 128); padding: 8px;">
    <n-button @click="theme = 'dark'">Dark</n-button>
    <n-button @click="theme = 'light'">Light</n-button>
    <n-el as="span" class="oops">
      I am a span
    </n-el>
  </div>
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
  color: black;
  transition: color .3s cubic-bezier(.4, 0, .2, 1);
}
.oops.n-light-theme {
  color: green
}
.oops.n-dark-theme {
  color: yellow
}
.n-button {
  margin: 0 12px 8px 0;
}
```