# Checkable

It can be checkable.

```html
<n-tag checkable disabled v-model:checked="checked"> Real Love </n-tag>
<n-tag type="success" checkable v-model:checked="checked"> Yes It Is </n-tag>
<n-tag type="warning" checkable v-model:checked="checked"> I'm Down </n-tag>
<n-tag type="error" checkable v-model:checked="checked"> Yesterday </n-tag>
<n-tag type="info" checkable v-model:checked="checked">
  I'm Looking Through You
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
