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
<n-alert type="warning" title="Caveat">
  Importing on demand is designed ahead but it hasn't been completely tested, which may cause some mistakes.
</n-alert >

If you need to import components on demand, you could use the following tool to generate the code.

> What should be noted is the CSS files start with 'Base' are not guaranteed to be stable (I'll try not to change them). Because they are parts of internal implementation of the library. If you find import mistakes after upgrade the package, you may have a look at here. It is possible to pack these common styles inside every component using it. However, compared to add routines when upgrading package, I perfer not to import duplicate codes. (It doesn't mean this is a better solution. It is only a choice.)

<install-code-generator />