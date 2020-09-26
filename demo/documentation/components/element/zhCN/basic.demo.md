# 基础
当配置提供者提供深色主题时，它上面会有 `n-dark-theme` 类。当配置提供者提供浅色主题时，它上面会有 `n-light-theme` 类。若非二者之一，它不会添加额外的类，这种行为和其他的 Naive UI 组件类似。

创建特定主题的组件十分管用。

```html
<n-element tag="span" class="myel">
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
  color: aquamarine;
}
```
