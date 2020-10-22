# 主体样式
```html
<n-popover
  :body-style="{ width: '500px' }"
  trigger="hover"
>
  <template v-slot:trigger>
    <n-button style="margin:0;">
      宽度 500px
    </n-button>
  </template>
  <span>长得像根条一样</span>
</n-popover>
```