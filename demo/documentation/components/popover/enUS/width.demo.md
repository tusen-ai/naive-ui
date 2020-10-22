# Body Style
```html
<n-popover
  :body-style="{ width: '500px' }"
  trigger="hover"
>
  <template v-slot:trigger>
    <n-button>
      Width 500px
    </n-button>
  </template>
  <span>Looks like a bar</span>
</n-popover>
```