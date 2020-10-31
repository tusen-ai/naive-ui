<!--anchor:on-->
# Get Started
## Installation
First install it.

```bash
npm install --save-dev naive-ui
```

## Usage
Add the following lines in you entry point js file.
```js
import { createApp } from 'vue'
import naive from 'naive-ui'

// If you want to use the built-in fonts of UI. Add the 
// following lines on demand.
// Generic Fonts, choose one at most
import 'naive-ui/fonts/Lato.css'
import 'naive-ui/fonts/FiraSans.css'
// Monospace Fonts
import 'naive-ui/fonts/FiraCode.css'

const app = createApp()
app.use(naive)
```

## Import on Demand (Working in Progress)