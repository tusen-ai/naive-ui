# 基础用法
```html
<n-card title="歌曲" style="margin-bottom: 16px;">
  <n-tabs
    v-model="name"
  >
    <n-tab-panel
      name="oasis"
      label="Oasis"
    >
      Wonderwall
    </n-tab-panel>
    <n-tab-panel
      name="the beatles"
      label="the Beatles"
    >
      Hey Jude
    </n-tab-panel>
    <n-tab-panel
      name="jay chou"
      label="周杰伦"
    >
      七里香
    </n-tab-panel>
  </n-tabs>
</n-card>
<n-card>
  <n-tabs
    v-model="func"
    size="large"
  >
    <n-tab-panel
      name="signin"
      label="登陆"
    >
      <n-form>
        <n-form-item-row label="用户名">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="密码">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>登陆</n-button>
    </n-tab-panel>
    <n-tab-panel
      name="signup"
      label="注册"
    >
      <n-form>
        <n-form-item-row label="用户名">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="密码">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="重复密码">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>注册</n-button>
    </n-tab-panel>
  </n-tabs>
</n-card>
```

```js
export default {
  data () {
    return {
      name: 'oasis',
      func: 'signin'
    }
  }
}
```

```css
.n-button {
  margin-top: 12px;
}
```