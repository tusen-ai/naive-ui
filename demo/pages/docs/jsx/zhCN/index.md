<!--anchor:on-->

# JSX & TSX

## 启用 JSX & TSX

关于启用 JSX 和 TSX，请参考你使用的工具链的相关文档。

## 使用组件

在 JSX 中，推荐以直接引入的形式使用组件。

```js
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
  render () {
    return <NButton>{{ default: () => 'Star Kirby' }}</NButton>
  }
})
```

## 形如 @update:\* 的 prop

naive-ui 中，所有形如 `on-update:*` 的 prop 都有一个对应的 `onUpdate*` 属性可供使用（由于 JSX 自身的规定，`on-update:*` 和 `onUpdate:*` 不是合法的 prop 名称）。

如果你发现没有，那一定是我忘了写了，请提交一个 Issue 或者 PR。

例如，在模板中 `<n-select @update:value="..." />` 在 JSX 中可以写为 `<NSelect onUpdateValue={...} />`。
