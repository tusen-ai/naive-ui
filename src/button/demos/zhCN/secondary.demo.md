# 次要按钮

```html
<n-space>
  <n-button strong secondary>Default</n-button>
  <n-button strong secondary type="tertiary">Tertiary</n-button>
  <n-button strong secondary type="primary">Primary</n-button>
  <n-button strong secondary type="info">Info</n-button>
  <n-button strong secondary type="success">Success</n-button>
  <n-button strong secondary type="warning">Warning</n-button>
  <n-button strong secondary type="error">Error</n-button>
  <n-button strong secondary round>Default</n-button>
  <n-button strong secondary round type="primary">Primary</n-button>
  <n-button strong secondary round type="info">Info</n-button>
  <n-button strong secondary round type="success">Success</n-button>
  <n-button strong secondary round type="warning">Warning</n-button>
  <n-button strong secondary round type="error">Error</n-button>
  <n-button strong secondary circle #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button strong secondary circle type="primary" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button strong secondary circle type="info" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button strong secondary circle type="success" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button strong secondary circle type="warning" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button strong secondary circle type="error" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
```
