# Custom Action
```html
<n-popconfirm :controller="controller">
  <template v-slot:activator>
    <n-button>Quit</n-button>
  </template>
  Are you sure to quit this game?
  <template v-slot:action>
    <n-button
      size="tiny"
      @click="handleOopsClick"
    >
      oops!
    </n-button>
  </template>
</n-popconfirm>
```