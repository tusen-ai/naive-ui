# Body Style
Setting body-style is sometimes useful.
```html
<n-tooltip :body-style="{ maxWidth: '400px' }" trigger="click">
  <template v-slot:trigger>
    <n-button>
      California Girls
    </n-button>
  </template>
  I wish they all could be California girls. I wish they all could be California
  girls. I wish they all could be California girls.
</n-tooltip>
<n-tooltip :body-style="{ maxWidth: '400px' }" trigger="click">
  <template v-slot:trigger>
    <n-button>
      California Girls
    </n-button>
  </template>
  I wish ...
</n-tooltip>
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```