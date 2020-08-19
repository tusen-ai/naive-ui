<!--anchor:on-->
# 试验性特性
<n-alert type="warning" title="注意">
  下列的所有功能都是<n-text strong>不稳定</n-text>的。只在真的需要的时候再使用他们，API 有可能在未来被改变。
</n-alert>

## 定制主题
这是一个试验性特性，因为 naive-ui 同时使用了 CSS-in-JS 和 Scss，我还没有找到一个把他们优雅整合的方式。

我计划在未来使用 CSS-in-JS 来重写全部的样式。在完成之前，接下来的方式会是一个临时的方案。

目前你只能改动主色。

受限你需要创建一个 `.scss` 文件。在这个文件中插入一个 getter 函数然后导入 naive-ui 的主 `.scss` 文件。你可能需要配置 sass-loader。

```scss
// customized-style.scss

@function get-primary-color ($theme) {
  @if $theme == 'light' {
    @return rgb(255, 0, 0);
  }
  @return null;
}

@function get-primary-hover-color ($theme) {
  @if $theme == 'light' {
    @return rgb(0, 255, 0);
  }
  @return null;
}

@function get-primary-active-color ($theme) {
  @if $theme == 'light' {
    @return rgb(0, 0, 255);
  }
  @return null;
}

// naive-ui 会检查 getter 函数的存在性然后在合适的时候设定相关变量
@import '~naive-ui/src/_styles/index.scss';
```

然后你需要在应用的入口文件中导入这个 `.scss` 文件。

```js
// index.js
// ...
import 'path/to/customized-style.scss'

// ... use naive-ui normally
```

还没有完事，你还需要在 JS 的环境中设定主色。因为 naive-ui 使用了 CSS-in-JS...


所以继续，在 naive-ui 的实例上设定亮色主题。

```js
// ...

import naive from 'naive-ui'

naive.styles.light.override({
  derived: {
    primaryColor: 'rgb(255, 0, 0)',
    primaryHoverColor: 'rgb(0, 255, 0)',
    primaryActiveColor: 'rgb(0, 0, 255)'
  }
})

Vue.use(naive)
```

好了。