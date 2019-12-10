# Basic
When Config Provider provides dark theme, it applies `n-dark-theme` class on it. When Config Provider provides light theme, it applies `n-light-theme` class on it. If Neither, it won't apply any additional class on it. Just like other themed Naive UI components.

It is very helpful to create themed component.

```html
<n-element as="span" class="myel">
  My Element
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