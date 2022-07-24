<markdown>
# Animation debug
</markdown>

<template>
  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs type="card">
      <n-tab-pane name="oasis" tab="Oasis" display-directive="show:lazy">
        <n-card>
          <n-tabs
            class="card-tabs"
            default-value="signin"
            size="large"
            animated
            style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
          >
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
      </n-tab-pane>
      <n-tab-pane
        name="the beatles"
        tab="the Beatles"
        display-directive="show:lazy"
      >
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦" display-directive="show:lazy">
        七里香
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
