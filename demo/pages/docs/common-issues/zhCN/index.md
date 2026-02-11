<!--anchor:on-->

# 常见问题

## 1. @update:xxx 和 on-update:xxx 的区别

### 情况 1

如果你没有在同一个组件上同时使用 `v-model:xxx` 和 `on-update:xxx`，`@update:xxx` 和 `on-update:xxx` 在模版中使用时没有任何区别。

在 Naive UI 中，全部的 API 文档使用 `on-update:xxx` 格式，因为 `@` 只是 Vue 提供的一种简写。

如果你偏爱 camelCase，可以使用 `onUpdate:xxx`。

如果你在使用 JSX，可以使用 `onUpdateXxx`（所有的 `onUpdate:xxx` 都有一个 `onUpdateXxx` 的对等实现）。

### 情况 2

如果你在一个组件上使用了 `v-model:xxx`，你应该使用 `@update:xxx`。

✅ 例子 `<n-input v-model:value="xxx" @update:value="yyy" />`。

❌ 例子 `<n-input v-model:value="xxx" :on-update:value="yyy" />`。

这是因为 `v-model:value="xxx"` 会被转化为 `:onUpdate:value="xxx"`。如果你同时使用了 `@update:value="yyy"`，他们会被转化为 `:onUpdate:value="[xxx, yyy]"`，然后 Naive UI 会来处理这种情况。

然而如果你使用了 `on-update:value="yyy"`，Vue 会生成类似于 `:onUpdate:value="xxx" :on-update:value="yyy"` 的代码，然后第二个属性会在运行时覆盖掉第一个，`v-model:value` 会崩掉。

如果你发现任何问题，欢迎在 GitHub 上提交 issue 和 PR。

## 2. 如何在单文件组件（SFC - Single File Component）中使用？

详见 [在 SFC 中使用](usage-sfc)

## 3. 如何修改默认主题色？

`Naive UI` 默认使用 `#18a058` 作为主色调。如需更改可参考 [调整主题](customize-theme)，[创建适配主题的组件](theme)

## 4. 如何使用 useMessage / useDialog / useNotification / useModal ?

- `setup` 中 `useMessage()`、`useDialog()`、`useNotification()`、`useLoadingBar()`、`useModal()` 需要在对应的 `Provider` 组件内部使用。
- `setup` 外 你需要在顶层 setup 中把 `useMessage` 返回的 `message` 值挂载到 `window` 下然后再调用，调用前需要确保 `message` 已经挂载成功。

```html
<template>
  <n-message-provider>
    <MyApp />
  </n-message-provider>
</template>
```

```html
<script setup>
  import { useMessage } from 'naive-ui'
  const message = useMessage()
</script>
```

通常建议在应用的根组件（如 `App.vue`）中放置所有 `Provider`：

```html
<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <router-view />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
```

如果不想嵌套 `Provider`，也可以使用 `createDiscreteApi` 来脱离上下文使用这些 API。详见 [脱离上下文的 API（Discrete API）](https://www.naiveui.com/zh-CN/os-theme/components/discrete)。

## 5. `Naive UI` 在移动端体验不佳

`Naive UI` 并非针对移动端设计，建议使用移动端专用的组件库

## 6. 提供了 Sketch，考虑提供 Figma UI Kit，Axure 或基于其他设计工具的版本吗 ？

目前我们主要提供 `Sketch` 设计资源，暂时没有 `Figma UI Kit`、`Axure` 或其他设计工具的官方版本。

不过，我们非常欢迎并感谢社区贡献。如果你愿意帮助适配或转换到其他设计工具，我们很乐意与你协作，并将你的贡献分享给更多用户

## 7. 参与贡献

请参考 [CONTRIBUTING.md](https://github.com/tusen-ai/naive-ui/blob/main/CONTRIBUTING.md)。
