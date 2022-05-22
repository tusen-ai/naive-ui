# 潜在的样式冲突

## 样式元素的位置

有时你可能希望控制样式元素插入的位置。

例如，如果你使用了 tailwind 的 reset 样式，你不希望它被插入 naive-ui 样式的后面，因为这可能会覆盖按钮等组件的样式。

你可以在 `head` 元素中加入一个 `<meta name="naive-ui-style" />` 元素，naive-ui 会把所有的样式刚好插入这个元素的前面。

同时，naive-ui 依赖 [vueuc](https://github.com/07akioni/vueuc)。如果你需要（通常应该不会），它的样式位置可以通过 `<meta name="vueuc-style" />` 控制。

```html
<head>
  <xxx />
  <!-- naive-ui 的样式会出现在这里 -->
  <meta name="naive-ui-style" />
  <!-- vueuc 的样式会出现在这里 -->
  <meta name="vueuc-style" />
  <xxx />
</head>
```

## 关于 tailwind 的 preflight 样式

你可能会发现在静态 HTML 文件中加入 meta 标签没用（naive 的样式仍然可能被覆盖），因为你的工具链可能永远会把 tailwind 的样式插入 head 的尾部。这种情况下，你需要在 app 挂载之前动态的插入 meta 标签。

```ts
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

vueApp.mount('#app')
```

## 禁用 preflight 样式

为了让多数用户直接无配置的使用 naive-ui，挂载任何一个组件都会创建全局的 CSS 样式。但是这样可能不是期望的行为，你可以使用 `n-config-provider` 来禁用这个行为。

```html
<n-config-provider preflight-style-disabled>
  <your-app />
</n-config-provider>
```
