# Button Group

Button can be grouped.

```html
<n-space>
  <n-button-group vertical>
    <n-button round>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Live a
    </n-button>
    <n-button ghost>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Sufficient
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Life
    </n-button>
  </n-button-group>
  <n-button-group vertical size="large">
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      With
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Enough
    </n-button>
    <n-button ghost round>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Happiness
    </n-button>
  </n-button-group>
  <n-button-group size="small">
    <n-button round>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Life
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Is
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Good
    </n-button>
  </n-button-group>
  <n-button-group>
    <n-button ghost>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Eat
    </n-button>
    <n-button ghost>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      One More
    </n-button>
    <n-button round>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      Apple
    </n-button>
  </n-button-group>
</n-space>
```

```js
import { LogInOutline as LogInIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    LogInIcon
  }
}
```
