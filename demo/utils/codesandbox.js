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

const appVue = `<template>
<n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <demo />
      </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</n-loading-bar-provider>
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./Demo.vue";

export default defineComponent({
components: {
  Demo,
},
});
</script>`

const mainJs = `import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";

const app = createApp(App);

app.use(naive);

app.mount("#app");
`

function getDeps (code) {
  return (code.match(/from '([^']+)'\n/g) || [])
    .map((v) => v.slice(6, v.length - 2))
    .reduce((prevV, dep) => {
      prevV[dep] = 'latest'
      return prevV
    }, {})
}

export function getCodeSandboxParams (code) {
  return getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDeps(code),
            vue: 'next',
            'vue-router': 'next',
            'naive-ui': 'latest'
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~4.5.0',
            typescript: '~4.6.3'
          }
        }
      },
      'index.html': {
        content: indexHtml
      },
      'src/Demo.vue': {
        content: code
      },
      'src/App.vue': {
        content: appVue
      },
      'src/main.js': {
        content: mainJs
      }
    }
  })
}
