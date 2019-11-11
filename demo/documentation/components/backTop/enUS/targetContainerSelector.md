# Target
```html
<n-back-top
  :target="target"
  :right="160"
  :visibility-height="10"
>
  <div style="width: 40px; height: 40px; line-height: 40px; text-align: center;">
    2.2
  </div>
</n-back-top>
<div ref="scrollContainer" style="overflow: auto; height: 64px;">
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
  6<br>
</div>
```
```js
export default {
  data () {
    return {
      target: () => this.$refs.scrollContainer
    }
  }
}
```