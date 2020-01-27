# Custom Gradient
By yourself.
```html
<n-gradient-text
  :gradient="{
    from: 'rgb(85, 85, 85)',
    to: 'rgb(170, 170, 170)'
  }"
>
  Custom Color
</n-gradient-text>
<br/>
<n-gradient-text
  :gradient="{
    deg: 180,
    from: 'rgb(85, 85, 85)',
    to: 'rgb(170, 170, 170)'
  }"
>
  Custom Color
</n-gradient-text>
<br/>
<n-gradient-text
  gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
>
  Custom Color
</n-gradient-text>
```
```css
.n-gradient-text {
  font-size: 24px;
}
```