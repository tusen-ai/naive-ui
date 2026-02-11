# Discrete API

If you want to use `useDialog`, `useMessage`, `useNotification`, `useLoadingBar`, `useModal` outside `setup`, you can use `createDiscreteApi` to create corresponding API.

Available since `2.29.0`.

<n-alert title="Caveat" type="warning" :bordered="false">
  <n-ul align-text>
    <li>
      Discrete API won't be affected by <n-text code>n-xxx-provider</n-text> in current app. If you need to share config, you should sync them manually. Also, you'd better not using discrete API and normal API together.
    </li>
    <li>
      Do not call <n-text code>createDiscreteApi</n-text> in <n-text code>setup</n-text> since it may cause some unexpected behaviors.
    </li>
  </n-ul>
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
    notificationProviderProps:
      | Ref<NotificationProviderProps>
      | NotificationProviderProps
    modalProviderProps: Ref<ModalProviderProps> | ModalProviderProps
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
  modal: ModalApi
  // Vue app
  app: App
  unmount: () => void
} {}
```
