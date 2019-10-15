# Wrap
```html
<div
>
  <n-spin
    style="display:inline-block"
    size="in-small"
    :spinning="spinning"
  >
    <n-button size="small">
      Small Spin
    </n-button>
  </n-spin>
  <n-spin
    style="display:inline-block"
    size="in-medium"
    :spinning="spinning"
  >
    <n-button size="medium">
      Medium Spin
    </n-button>
  </n-spin>
  <n-spin
    style="display:inline-block"
    size="in-large"
    :spinning="spinning"
  >
    <n-button size="large">
      Large Spin
    </n-button>
  </n-spin>
  <n-spin
    style="display:inline-block" 
    :spinning="spinning"
  >
    <n-alert
      title="Success Text"
      type="success"
    >
      Leave it till tomorrow to unpack my case
    </n-alert>
  </n-spin>
</div>
 <pre class="n-doc-section__inspect"><n-button @click="spinning = !spinning">spin</n-button></pre>
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