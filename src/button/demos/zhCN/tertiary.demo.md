# 次次要按钮

```html
<n-space>
  <n-button tertiary>Default</n-button>
  <n-button tertiary type="primary">Primary</n-button>
  <n-button tertiary type="info">Info</n-button>
  <n-button tertiary type="success">Success</n-button>
  <n-button tertiary type="warning">Warning</n-button>
  <n-button tertiary type="error">Error</n-button>
  <n-button tertiary round>Default</n-button>
  <n-button tertiary round type="primary">Primary</n-button>
  <n-button tertiary round type="info">Info</n-button>
  <n-button tertiary round type="success">Success</n-button>
  <n-button tertiary round type="warning">Warning</n-button>
  <n-button tertiary round type="error">Error</n-button>
  <n-button tertiary circle #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button tertiary circle type="primary" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button tertiary circle type="info" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button tertiary circle type="success" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button tertiary circle type="warning" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button tertiary circle type="error" #icon
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
