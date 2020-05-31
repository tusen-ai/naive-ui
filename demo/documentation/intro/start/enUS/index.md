<!--no-demo-->
# Get Started
```component
installCodeGenerator
```
## Installation
First install it.

```bash
npm install --save-dev naive-ui
```

## Usage
Add the following lines in you entry point js file.
```js
import naive from 'naive-ui'
import 'naive-ui/lib/styles/index.css'

Vue.use(naive)
```

## Import on Demand
<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>Importing on demand is still experimental. If you are facing problems be free to create an issue.</n-li>
    <n-li>CSS files start with 'Base' are not guaranteed to be stable for now. If you find importing mistakes after upgrading the package, you may have a look at here.</n-li>
  </n-ol>
</n-alert >

<install-code-generator />