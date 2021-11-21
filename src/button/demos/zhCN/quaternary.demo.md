# 次次次要按钮

```html
<n-space>
  <n-button quaternary>Default</n-button>
  <n-button quaternary type="primary">Primary</n-button>
  <n-button quaternary type="info">Info</n-button>
  <n-button quaternary type="success">Success</n-button>
  <n-button quaternary type="warning">Warning</n-button>
  <n-button quaternary type="error">Error</n-button>
  <n-button quaternary round>Default</n-button>
  <n-button quaternary round type="primary">Primary</n-button>
  <n-button quaternary round type="info">Info</n-button>
  <n-button quaternary round type="success">Success</n-button>
  <n-button quaternary round type="warning">Warning</n-button>
  <n-button quaternary round type="error">Error</n-button>
  <n-button quaternary circle #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button quaternary circle type="primary" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button quaternary circle type="info" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button quaternary circle type="success" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button quaternary circle type="warning" #icon
    ><n-icon><cash-icon /></n-icon
  ></n-button>
  <n-button quaternary circle type="error" #icon
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
