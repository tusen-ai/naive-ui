# Theme Environment
```html
<n-button @click="theme = 'dark'">Dark Theme</n-button>
<n-button @click="theme = 'light'">Light Theme</n-button>
<n-config-provider :theme="theme" :theme-environment="env">
  <n-config-consumer>
    <template v-slot="{ theme, themeEnvironment }">
      <div class="box" :style="{
        backgroundColor: themeEnvironment.backgroundColor,
        color: themeEnvironment.color
      }">
        {{ theme }}
      </div>
    </template>
  </n-config-consumer>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      theme: 'light',
      env: {
        dark: {
          backgroundColor: 'yellow',
          color: 'black'
        },
        light: {
          backgroundColor: 'green',
          color: 'white'
        }
      }
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
.box {
  width: 100px;
  height: 100px;
  transition: all .3s cubic-bezier(.4, 0, .2, 1);
}
```