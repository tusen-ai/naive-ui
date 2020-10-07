<!--anchor:on-->
# Experimental Features
<n-alert type="warning" title="Caveats">
  The following features are <n-text strong>unstable</n-text>. Use them if you really need and perpare to follow the API changes.
</n-alert>

## Customize Theme

```js
// ...

import naive from 'naive-ui'

naive.styles.light.override({
  derived: {
    primaryColor: 'rgb(255, 0, 0)',
    primaryHoverColor: 'rgb(0, 255, 0)',
    primaryActiveColor: 'rgb(0, 0, 255)'
  }
})

Vue.use(naive)
```

For specific variables, please see source code.

### Use Tusimple Theme

```js
// ...
import tusimpleTheme from 'naive-ui/themes/tusimple'
import naive from 'naive-ui'

naive.use(tusimpleTheme)

Vue.use(naive)
```