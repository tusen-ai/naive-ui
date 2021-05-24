# 前缀 & 后缀

使用 `prefix`、`suffix` slot 来添加前后缀。

```html
<n-tabs default-value="oasis" show-divider>
  <template #prefix>Prefix</template>
  <n-tab-pane name="oasis" label="Oasis">Wonderwall</n-tab-pane>
  <n-tab-pane name="the beatles" label="the Beatles">Hey Jude</n-tab-pane>
  <n-tab-pane name="jay chou" label="周杰伦">七里香</n-tab-pane>
  <template #suffix>Suffix</template>
</n-tabs>
```
