# Customize Tooltip Content

Use `tooltip` slot to customize tooltip content.

```html
<n-ellipsis style="max-width: 240px;">
  The oh so lonesome sea monster dwelling in my heart, the king of sorrow,
  begins to tire of the gloom and still current of the deep waters.
  <template #tooltip>
    <div style="text-align: center;">
      <i>Qinhuangdao</i><br />
      The oh so lonesome sea monster dwelling in my heart,<br />
      the king of sorrow,<br />
      begins to tire of the gloom and still current of the deep waters.
    </div>
  </template>
</n-ellipsis>
```
