# Size

`font-size` CSS also works, but can be overridden by setting the size (if just a number is used, it's taken as pixels).

```html
<n-gradient-text type="info"> Live Forever </n-gradient-text>
<n-gradient-text type="danger"> Live Forever </n-gradient-text>
<br />
<n-gradient-text :size="24" type="warning">
  Married with Children
</n-gradient-text>
<br />
<n-gradient-text :size="24" type="success"> Back in the USSR </n-gradient-text>
```

```css
.n-gradient-text {
  font-size: 36px;
}
```
