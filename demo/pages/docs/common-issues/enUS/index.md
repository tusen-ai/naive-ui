<!--anchor:on-->

# Common Issues

## 1. The difference between @update:xxx and on-update:xxx

### Case 1

If you are not using `v-model:xxx` with `on-update:xxx` on the same component, there is no difference between `@update:xxx` and `on-update:xxx` when used in templates.

In Naive UI, all API documents use the `on-update:xxx` format, because `@` is just a shorthand provided by Vue.

If you prefer camelCase, you can use `onUpdate:xxx`.

If you are using JSX, you can use `onUpdateXxx` (all `onUpdate:xxx` have an equivalent implementation of `onUpdateXxx`).

### Case 2

If you are using `v-model:xxx`, you should use `@update:xxx` on the same component.

✅ example `<n-input v-model:value="xxx" @update:value="yyy" />`.

❌ example `<n-input v-model:value="xxx" :on-update:value="yyy" />`.

That is because `v-model:value="xxx"` will be transformed to `:onUpdate:value="xxx"`. If you are using `@update:value="yyy"` together, it will be `:onUpdate:value="[xxx, yyy]"`, and then Naive UI would take care of if.

However if you are using `on-update:value="yyy"`, Vue would generate code like `:onUpdate:value="xxx" :on-update-value="yyy"` and the second one would override the first one in Vue runtime. The `v-model:value` would be broken.

If you have any problems, feel free to create a PR or issue on GitHub.

## 2. How to use in Single File Component(SFC)?

please see [Usage in SFC](usage-sfc)

## 3. How to customize the default theme color?

`Naive UI` uses `#18a058` as the default primary color. To change it, please refer to [Customize Theme](customize-theme) and [Create Theme Compatible Components](theme).

## 4. How to use useMessage / useDialog / useNotification / useModal?

- Inside `setup`, `useMessage()`, `useDialog()`, `useNotification()`, `useLoadingBar()`, and `useModal()` must be used inside the corresponding `Provider` component.
- Outside `setup`, you need to mount the value returned by `useMessage` to `window` in the top-level `setup`, and then call it. Make sure `message` has been successfully mounted before calling it.

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

It is generally recommended to place all `Provider` components in the root component (e.g. `App.vue`):

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

If you don't want to nest `Provider` components, you can also use `createDiscreteApi` to use these APIs without context. See [Discrete API](https://www.naiveui.com/en-US/os-theme/components/discrete) for details.

## 5. `Naive UI` does not work well on mobile

`Naive UI` is not designed for mobile devices. It is recommended to use a mobile-specific component library.

## 6. Sketch is provided. Are there plans for Figma UI Kit, Axure, or other design tools?

Currently we mainly provide `Sketch` design resources. There are no official versions for `Figma UI Kit`, `Axure`, or other design tools at this time.

However, we welcome and appreciate community contributions. If you are willing to help adapt or convert to other design tools, we would be happy to collaborate with you and share your contributions with more users.

## 7. Contributing

Please refer to [CONTRIBUTING.md](https://github.com/tusen-ai/naive-ui/blob/main/CONTRIBUTING.md).
