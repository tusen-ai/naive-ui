# 插槽

卡片有很多插槽，希望能帮你少写点代码。

```html
<n-card title="卡片插槽示例">
  <template v-slot:header-extra> v-slot:header-extra </template>
  卡片内容
  <template v-slot:footer> v-slot:footer </template>
  <template v-slot:action> v-slot:action </template>
</n-card>
```
