<!--anchor:on-->

# Usage

## Quick Start

Add the following lines in you entry point js file.

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

const app = createApp()
app.use(naive)
```

## Config Fonts

naive-ui works with [vfonts](https://github.com/07akioni/vfonts). You can use font from `vfonts` easily which includes general fonts and monospace fonts.

```js
import { createApp } from 'vue'
import naive from 'naive-ui'

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// then it works

const app = createApp()
app.use(naive)
```

## Import on Demand (Tree Shaking)

naive-ui support tree shaking, you can directly import components or install ui globally.

### Use Components Directly

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

### Install Globally

```js
import { createApp } from 'vue'
import {
  // create naive ui
  create,
  // component
  NButton
} from 'naive-ui'

const naive = create({
  components: [NButton]
})

const app = createApp()

app.use(naive)
```
