# Button Group
Button can be grouped.
```html
<n-button-group vertical>
  <n-button
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Live a
  </n-button>
  <n-button
    ghost
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Sufficient
  </n-button>
  <n-button>
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Life
  </n-button>
</n-button-group>
<n-button-group vertical size="large">
  <n-button>
    <template v-slot:icon>
      <log-in-outline />
    </template>
    With
  </n-button>
  <n-button>
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Enough
  </n-button>
  <n-button
    ghost
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Happiness
  </n-button>
</n-button-group>
<n-button-group size="small">
  <n-button
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Life
  </n-button>
  <n-button>
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Is
  </n-button>
  <n-button>
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Good
  </n-button>
</n-button-group>
<n-button-group>
  <n-button
    ghost
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Eat
  </n-button>
  <n-button
    ghost
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    One More
  </n-button>
  <n-button
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    Apple
  </n-button>
</n-button-group>
```
```js
import logInOutline from 'naive-ui/lib/icons/log-in-outline'

export default {
  components: {
    logInOutline
  }
}
```
```css
.n-button-group {
  margin: 0 12px 12px 0;
}
```