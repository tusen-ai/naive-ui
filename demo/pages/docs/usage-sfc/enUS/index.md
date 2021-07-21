<!--anchor:on-->

# Usage in SFC

You can directly import components from Naive UI or install it globally to a Vue app.

## Import Directly (Recommended)

You can import component directly and use it. In this form, only components imported will be bundled.

If you want to know how to import themes and locales, please see [Import on Demand](import-on-demand).

```html
<template>
  <n-button>naive-ui</n-button>
</template>

<script>
  import { NButton } from 'naive-ui'

  export default {
    components: {
      NButton
    }
  }
</script>
```

If you can use vue setup script, you can use it like this.

```html
<template>
  <n-button>naive-ui</n-button>
</template>

<script setup>
  import { NButton } from 'naive-ui'
</script>
```

## Install Globally (Not Recommended)

### Install All Components

No tree-shaking. Bundle will have redundant codes.

If you want to install globally but not want all components, please see [Import on Demand](import-on-demand).

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
```

After the installation. You can use all the components in you SFC like this.

```html
<template>
  <n-button>naive-ui</n-button>
</template>
```
