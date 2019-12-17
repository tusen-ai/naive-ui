# Basic
```html
<n-card title="Song of" style="margin-bottom: 16px;">
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
      label="Jay Chou"
    >
      Qilixiang
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
      label="Sign in"
    >
      <n-form>
        <n-form-item-row label="Username">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Password">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>Sign In</n-button>
    </n-tab-panel>
    <n-tab-panel
      name="signup"
      label="Sign Up"
    >
      <n-form>
        <n-form-item-row label="Username">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Password">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Reenter Password">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>Sign Up</n-button>
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