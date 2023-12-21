<!--anchor:on-->

# 受控模式与非受控模式

一个组件的行为可以分为受控模式和非受控模式两种。非受控模式指的是只监听组件的变化，而不去控制组件的 value，受控模式指的是控制组件的值。

## 非受控模式

在这种情况下，你不能去控制 `<n-input />` 的 `value`，而只能监听它的变化，组件值的变化由组件自身控制。

```html
<n-input @update:value="handleUpdateValue" />
```

## 受控模式

在这种情况下，你既监听了组件的变化，然后也控制了组件的值。如果你不更新 `value`，那么组件的值不会改变，组件值的变化由你控制。

```html
<n-input :value="value" @update:value="handleUpdateValue" />
```

### `v-model`

`v-model` 控制的组件在受控模式下，因为 `v-model` 等同于 `:model-value` 和 `@update:model-value` 的组合。

## naive-ui 中的受控模式

不同的组件库区分受控与非受控模式的区别是不同的。在 naive-ui 中，只要 `value` 是 `undefined` 或者根本没有传，那么组件的值会是非受控的。也就是说你将一个组件的值设为 `undefined` 并不能清空它，只会改变它的控制模式。一般情况下清空可以使用 `null`。

### 不止 `value`

任何 `xxx` 与 `@update:xxx` 的属性对都可以有受控和非受控模式。
