# Has Title

```html
<n-space>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>click</n-button>
    </template>
    <template #header>I am title</template>
    <span>Maybe I don't really want to know how your garden grows</span>
  </n-popover>
  <n-popover trigger="click" title="I am title">
    <template #trigger>
      <n-button>click</n-button>
    </template>
    <span>Maybe I don't really want to know how your garden grows</span>
  </n-popover>
</n-space>
```
