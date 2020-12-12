# Flex Labels

```html
<n-card title="Song of" style="margin-bottom: 16px;">
  <n-tabs v-model:value="name" justify-content="space-evenly">
    <n-tab-pane name="oasis" label="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" label="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" label="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>
</n-card>
<n-card title="Too Simple">
  <n-tabs v-model:value="func" label-size="large">
    <n-tab-pane name="signin" label="Sign in">
      <n-form>
        <n-form-item-row label="Username">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Password">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>Sign In</n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" label="Sign Up">
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
    </n-tab-pane>
  </n-tabs>
</n-card>
```

```js
export default {
  data() {
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
