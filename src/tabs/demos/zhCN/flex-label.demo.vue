<markdown>
# Flex 布局的标签

只对 `'line'` 和 `'bar'` 类型的 Tabs 生效。
</markdown>

<template>
  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs default-value="oasis" justify-content="space-evenly" type="line">
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦">
        七里香
      </n-tab-pane>
    </n-tabs>
  </n-card>
  <n-card title="Too Simple">
    <n-tabs default-value="signin" size="large" justify-content="space-evenly">
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
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
        <n-button type="primary" block secondary strong>
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
