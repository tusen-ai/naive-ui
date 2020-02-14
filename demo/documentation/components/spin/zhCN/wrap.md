# 填充内容
你可以把其他内容包裹在 Spin 中。为了匹配一些常用组件的尺寸，Spin 还提供 `in-small`、`in-medium` 和 `in-large` 的尺寸。
```html
<div
>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-small"
    :spinning="spinning"
  >
    <n-button size="small">
      小的里面
    </n-button>
  </n-spin>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-medium"
    :spinning="spinning"
  >
    <n-button size="medium">
      中的里面
    </n-button>
  </n-spin>
  <n-spin
    style="display: inline-block; margin: 0 8px 12px 0;"
    size="in-large"
    :spinning="spinning"
  >
    <n-button size="large">
      大的里面
    </n-button>
  </n-spin>
  <n-spin
    :spinning="spinning"
  >
    <n-alert
      title="啦啦啦"
      type="success"
    >
      明天再打开行李箱。宝贝，挂电话啦。
    </n-alert>
  </n-spin>
</div>
<n-button @click="spinning = !spinning">点击来转圈</n-button>
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