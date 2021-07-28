# Processing

```html
<n-space vertical>
  <n-progress
    type="line"
    :percentage="60"
    :indicator-placement="'inside'"
    processing
  />
  <n-progress type="circle" status="info" :percentage="60" processing />
  <n-el>
    <n-progress
      type="multiple-circle"
      :stroke-width="6"
      :circle-gap="0.5"
      :percentage="[
        percentage,
        (percentage + 10) % 100,
        (percentage + 20) % 100,
        (percentage + 30) % 100
      ]"
      :color="[
        'var(--info-color)',
        'var(--success-color)',
        'var(--warning-color)',
        'var(--error-color)'
      ]"
      :rail-style="[
        { stroke: 'var(--info-color)', opacity: 0.3 },
        { stroke: 'var(--success-color)', opacity: 0.3 },
        { stroke: 'var(--warning-color)', opacity: 0.3 },
        { stroke: 'var(--error-color)', opacity: 0.3 },
      ]"
      processing
    />
  </n-el>
</n-space>
```

```js
export default {
  data () {
    return {
      percentage: 0
    }
  }
}
```
