# Custom Color
```html
<n-progress
  type="circle"
  :percentage="20"
  color="red"
  rail-color="yellow"
  indicator-text-color="green"
/>
<n-progress
  type="line"
  color="red"
  rail-color="yellow"
  indicator-placement="inside-label"
  indicator-text-color="green"
  :percentage="20"
/>
<n-progress
  type="line"
  color="red"
  rail-color="yellow"
  :percentage="20"
  indicator-text-color="green"
/>
<n-progress
  type="multiple-circle"
  :percentage="[50, 25]"
  :color="['red', 'blue']"
  :rail-color="['yellow', 'yellow']"
/>
```
```js
```