# 使用 UMD

<n-alert title="警告" type="warning" :bordered="false">
  目前 UMD 版本的 naive 标签自闭合存在问题。请显式进行标签闭合。如：<n-text code>&lt;n-input>&lt;/n-input></n-text>。
</n-alert>

在 `2.30.3` 版本后，你可以使用 UMD 版本的 naive。

如果你要使用 minify 版本的包，将 `https://unpkg.com/naive-ui@version/dist/index.prod.js` 作为 `src`，`version` 是你期望使用的版本，如果不指定 `version` 则会使用最新的版本。

你最好锁定包的版本，不然可能会有不兼容变更。

下面是个基本 [demo](https://jsbin.com/saxubitaki/1/edit?html,output)：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/vue"></script>
    <!-- 会使用最新版本，你最好指定一个版本 -->
    <script src="https://unpkg.com/naive-ui"></script>
  </head>
  <body>
    <div id="app">
      <n-button>{{ message }}</n-button>
    </div>
    <script>
      const App = {
        setup() {
          return {
            message: 'naive'
          }
        }
      }
      const app = Vue.createApp(App)
      app.use(naive)
      app.mount('#app')
    </script>
  </body>
</html>
```
