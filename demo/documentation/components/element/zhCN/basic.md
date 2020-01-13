# 基础
当配置提供者提供深色主题时，它应用 `n-dark-theme` class。当配置提供者提供浅色主题时，它应用 `n-light-theme` class。若非二者之一，它不会应用额外的class，正如其他特定主题的Naive UI组件。

创建特定主题的组件十分管用。

```html
<n-element as="span" class="myel">
  我的元素
</n-element>
```
```css
.myel {
  transition: color .3s cubic-bezier(.4, 0, .2, 1);
}

.myel.n-light-theme {
  color: green;
}

.myel.n-dark-theme {
  color: yellow;
}
```
