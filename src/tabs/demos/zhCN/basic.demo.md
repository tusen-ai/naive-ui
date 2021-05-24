# 基础用法

```html
<n-card title="歌曲" style="margin-bottom: 16px;">
  <n-tabs show-divider>
    <n-tab-pane name="oasis" label="Oasis">Wonderwall</n-tab-pane>
    <n-tab-pane name="the beatles" label="the Beatles">Hey Jude</n-tab-pane>
    <n-tab-pane name="jay chou" label="周杰伦">七里香</n-tab-pane>
  </n-tabs>
</n-card>
<n-card>
  <n-tabs default-value="signin" label-size="large">
    <n-tab-pane name="signin" label="登录">
      <n-form>
        <n-form-item-row label="用户名">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="密码">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>登录</n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" label="注册">
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
    </n-tab-pane>
  </n-tabs>
</n-card>
```
