# 不要箭头
```html
<n-popover :show-arrow="false">
  <template v-slot:trigger>
    <n-button>
      悬浮
    </n-button>
  </template>
  <span>没有箭头就是矩形了</span>
</n-popover>
```