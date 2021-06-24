# Common Issues

## 1. The difference between @update:xxx and on-update:xxx

There is no difference between `@update:xxx` and `on-update:xxx` when used in templates.

In Naive UI, all API documents use the `on-update:xxx` format, because `@` is just a shorthand provided by Vue.

If you prefer camelCase, you can use `onUpdate:xxx`.

If you are using JSX, you can use `onUpdateXxx` (all `onUpdate:xxx` have an equivalent implementation of `onUpdateXxx`).

If you have any problem, feel free to create a PR or issue on GitHub.
