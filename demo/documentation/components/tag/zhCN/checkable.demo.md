# 可选择
它可以变成可选择的。
```html
<n-tag
  checkable
  disabled
  v-model="checked"
>
  爱在西元前
</n-tag>
<n-tag
  type="success"
  checkable
  v-model="checked"
>
  不该
</n-tag>
<n-tag
  type="warning"
  checkable
  v-model="checked"
>
  超人不会飞
</n-tag>
<n-tag
  type="error"
  checkable
  v-model="checked"
>
  手写的从前
</n-tag>
<n-tag
  type="info"
  checkable
  v-model="checked"
>
  哪里都是你
</n-tag>
```
```js
export default {
  data () {
    return {
      checked: false
    }
  }
}
```
```css
.n-tag {
  margin-right: 12px;
  margin-bottom: 8px;
}
```
