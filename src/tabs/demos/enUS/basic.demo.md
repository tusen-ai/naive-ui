# Basic

```html
<n-card title="Song of" style="margin-bottom: 16px;">
  <n-tabs show-divider>
    <n-tab-pane name="oasis" tab="Oasis">Wonderwall</n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles">Hey Jude</n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou">Qilixiang</n-tab-pane>
  </n-tabs>
</n-card>
<n-card>
  <n-tabs default-value="signin" size="large" show-divider>
    <n-tab-pane name="signin" tab="Sign in">
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
    <n-tab-pane name="signup" tab="Sign Up">
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
