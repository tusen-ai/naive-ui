<markdown>
# Basic
</markdown>

<template>
  <n-card title="Song of" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Jay Chou">
        Qilixiang
      </n-tab-pane>
    </n-tabs>
  </n-card>
  <n-card>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="Sign in">
        <n-form>
          <n-form-item-row label="Username">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          Sign In
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="Sign up">
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
        <n-button type="primary" block secondary strong>
          Sign up
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
