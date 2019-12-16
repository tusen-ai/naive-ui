# 封面
卡片可以有封面。
```html
<n-card title="带封面的卡片">
  <template v-slot:cover>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg">
  </template>
  卡片内容
</n-card>
```
```css
.n-card {
  max-width: 300px;
}
```
