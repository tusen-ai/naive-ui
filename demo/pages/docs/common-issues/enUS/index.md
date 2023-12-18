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
