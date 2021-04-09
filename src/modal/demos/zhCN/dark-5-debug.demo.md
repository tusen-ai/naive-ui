# Dark Debug 5

```html
<n-button @click="showModal = !showModal">Toggle</n-button>
<n-modal
  title="Dark Modal Debug"
  preset="card"
  v-model:show="showModal"
  :style="{ marginTop: '24px', marginBottom: '24px', width: '800px' }"
>
  <n-calendar />
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
