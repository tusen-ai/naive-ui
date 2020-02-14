# Wrap
You can wrap a component inside spin. To match regular components's size, spin alse provides `in-small`, `in-medium` and `in-large` sizes.
```html
<div
>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-small"
    :spinning="spinning"
  >
    <n-button size="small">
      in small
    </n-button>
  </n-spin>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-medium"
    :spinning="spinning"
  >
    <n-button size="medium">
      in medium
    </n-button>
  </n-spin>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-large"
    :spinning="spinning"
  >
    <n-button size="large">
      in large
    </n-button>
  </n-spin>
  <n-spin
    :spinning="spinning"
  >
    <n-alert
      title="La La La"
      type="success"
    >
      Leave it till tomorrow to unpack my case. Honey disconnect the phone.
    </n-alert>
  </n-spin>
</div>
<n-button @click="spinning = !spinning">Click to Spin</n-button>
```
```js
export default {
  data () {
    return {
      spinning: false
    }
  }
}
```
```css
.n-alert {
  margin: 0 0 12px 0;
}
```