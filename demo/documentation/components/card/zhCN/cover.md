# 封面
卡片可以有封面。
```html
<n-card title="带封面的卡片">
  <template v-slot:cover>
    <img src="https://naiveui.oss-cn-hongkong.aliyuncs.com/07akioni.jpeg">
  </template>
  卡片内容
</n-card>
```
```css
.n-card {
  max-width: 300px;
}
```
