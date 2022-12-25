# Using UMD

After version `2.30.3`, you can use UMD version of naive.

If you want to use a minified version of naive, use `https://unpkg.com/naive-ui@version/dist/index.prod.js` as `src`. `version` is the version of naive-ui you want to use. If you don't specify a version, latest version would be used.

It's preferable to link to a specific version of the package, as always relying on the latest version may lead to breaking changes.

Here's a basic [demo](https://jsbin.com/saxubitaki/1/edit?html,output):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/vue"></script>
    <!-- Would use latest version, you'd better specify a version -->
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
