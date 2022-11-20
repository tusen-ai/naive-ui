# 脱离上下文的 API（v2.29.0）

如果你想在 `setup` 外使用 `useDialog`、`useMessage`、`useNotification`、`useLoadingBar`，可以通过 `createDiscreteApi` 来构建对应的 API。

<n-alert title="注意" type="warning" :bordered="false">
  1. 脱离上下文的 API 不会受 <n-text code>n-xxx-provider</n-text> 的影响，并且和应用上下文中对应组件会使用不同的 DOM 容器。如果需要的话，你需要手动同步这些信息。并且最好不要混用两类 API。2. 不要在 <n-text code>setup</n-text> 中调用 <n-text code>createDiscreteApi</n-text>，可能会有一些意外的问题出现。
</n-alert>

## 演示

```demo
basic.vue
```

## API

### createDiscreteApi

```ts
function createDiscreteApi(
  includes: Array<'message' | 'dialog' | 'notification' | 'loadingBar'>,
  options: {
    configProviderProps: Ref<ConfigProviderProps> | ConfigProviderProps
    messageProviderProps: Ref<MessageProviderProps> | MessageProviderProps
    dialogProviderProps: Ref<DialogProviderProps> | DialogProviderProps
    notificationProviderProps: Ref<NotificationProps> | NotificationProps
    loadingBarProviderProps:
      | Ref<LoadingBarProviderProps>
      | LoadingBarProviderProps
  }
): {
  // 只有 includes 中包含的 API 才会被创建
  message: MessageApi
  dialog: DialogApi
  notification: NotificationApi
  loadingBar: LoadingBarApi
  // Vue app
  app: App
  unmount: () => void
} {}
```
