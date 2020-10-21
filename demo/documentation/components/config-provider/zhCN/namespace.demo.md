# 命名空间（卸载内容的类名）
组件的一部分是卸载在 `document.body` 上的。如需给这些卸载的元素添加 class，使用 `n-config-provider` 的 `namespace` 属性。打开开发者工具可以看到被卸载的 DOM。
```html
<n-config-provider :namespace="ns">
  <n-tooltip
    placement="bottom"
    trigger="click"
  >
    <template v-slot:trigger>
      <n-button
        @click="isActive = true"
      >
        激活含卸载内容的组件
      </n-button>
    </template>
    <span>
      卸载内容
    </span>
  </n-tooltip>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      ns: 'custom-app-namespace1',
      isActive: false
    }
  }
}
```
