# 前后缀

你可能想再前后都加点啥。

```html
<n-pagination item-count="101">
  <template #prefix="{ startIndex }"> 从第 {{ startIndex }} 项开始 </template>
  <template #suffix="{ endIndex }"> 从第 {{ endIndex }} 项结束 </template>
</n-pagination>
```
