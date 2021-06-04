import { getParameters } from 'codesandbox/lib/api/define'

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Naive UI Demo</title>
    <style>
      body {
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`

const mainJs = `import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";

const app = createApp(App);

app.use(naive);

app.mount("#app");
`

export function getCodeSandboxParams (code) {
  return getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            vue: 'next',
            'naive-ui': 'latest'
          }
        }
      },
      'index.html': {
        content: indexHtml
      },
      'src/App.vue': {
        content: code
      },
      'src/main.js': {
        content: mainJs
      }
    }
  })
}
