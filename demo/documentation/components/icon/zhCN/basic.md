# 基础用法
```html
<n-icon
  size="40"
  color="#e4000f"
>
  <game-controller-outline />
</n-icon>
<n-icon
  size="40"
  color="#0e7a0d"
>
  <game-controller />
</n-icon>
<n-icon
  size="40"
>
  <game-controller-outline />
</n-icon>
```
```js
import gameControllerOutline from 'naive-ui/lib/icons/game-controller-outline'
import gameController from 'naive-ui/lib/icons/game-controller'

export default {
  components: {
    gameControllerOutline,
    gameController
  }
}
```