<!--anchor:on-->

# Controlled manner & uncontrolled manner

A component's manner can be controlled or uncontrolled. Uncontrolled manner means you only listen to its change but not control its value. Controlled manner means you control the component's value.

## Uncontrolled manner

In this situation, you don't set `<n-input />`'s `value` but only listen to its change. Component's value will be controlled by itself.

```html
<n-input @update:value="handleUpdateValue" />
```

## Controlled manner

In the situation, you listen to component's value & change at the same time. If you don't update `value`, component's value won't be changed. Its value is controlled by you.

```html
<n-input :value="value" @update:value="handleUpdateValue" />
```

### `v-model`

A component with `v-model` works in controlled manner, since `v-model` is the same as `:model-value` and `@update:model-value`.

## Uncontrolled manner in naive-ui

Different library has different behavior on how to distinguish controlled or uncontrolled manner. In naive-ui, if `value` is `undefined` or not passed, it will be uncontrolled. That is to say, if you set a component's value to `undefined` won't clear it but transform it from controlled manner to uncontrolled manner. If you need to clear it, at most time you can use `null`.

### Not only `value`

Any props pair like `xxx` & `@update:xxx` can work both in controlled manner or uncontrolled manner.
