# Discrete API（v2.29.0)

If you want to use `useDialog`, `useMessage`, `useNotification`, `useLoadingBar` outside `setup`, you can use `createDiscreteApi` to create corresponding API.

<n-alert title="Caveat" type="warning">
Discrete API won't be affected by <n-text code>n-xxx-provider</n-text> in current app. If you need to share config, you should sync them manually. Also, you'd better not using discrete API and normal API together.
</n-alert>

## Demo

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
  // only API specified in `includes` will be created
  message: MessageApi
  dialog: DialogApi
  notification: NotificationApi
  loadingBar: LoadingBarApi
  // Vue app
  app: App
  unmount: () => void
} {}
```
