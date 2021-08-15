# Raw Debug

```html
<n-button @click="showModal = true"> 来吧 </n-button>
<n-modal v-model:show="showModal">
  <div class="box1">
    <div class="box2">123</div>
  </div>
</n-modal>
```

```js
export default {
  data () {
    return {
      showModal: false
    }
  }
}
```
