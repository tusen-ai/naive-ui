# Manually Positioned
```html
<div style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @click="handleClick"></div>
<n-popover trigger="manual" :show="showPopover" :x="x" :y="y" manually-positioned>
  666
</n-popover>
```
```js
export default {
  methods: {
    handleClick(e) {
      if (this.showPopover) {
        this.showPopover = false
      } else {
        this.showPopover = true
        this.x = e.clientX
        this.y = e.clientY
      }
    }
  },
  data () {
    return {
      showPopover: false,
      x: 0,
      y: 0
    }
  }
}
```