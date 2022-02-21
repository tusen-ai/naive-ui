<markdown>
# 标题

Header 不光是 Header。你知道 UI 一般很喜欢在 Header 旁边弄一个带颜色的竖条（确实，光有文字太单调了）。所以这它可以有个条。
</markdown>

<template>
  <div style="padding-left: 24px; position: relative">
    <div
      style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 24px;
        background-color: rgba(128, 128, 128, 0.5);
      "
    />
    <n-h1>
      <n-text type="primary">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar">
      <n-text type="primary">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar" align-text>
      <n-text type="primary">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar" align-text type="success">
      <n-text type="success">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar" align-text type="info">
      <n-text type="info">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar" align-text type="warning">
      <n-text type="warning">
        sin(x)
      </n-text>
    </n-h1>
    <n-h1 prefix="bar" align-text type="error">
      <n-text type="error">
        sin(x)
      </n-text>
    </n-h1>
    <n-h2>cos(x)</n-h2>
    <n-h2 prefix="bar">
      cos(x)
    </n-h2>
    <n-h2 prefix="bar" align-text>
      cos(x)
    </n-h2>
    <n-h3>-sin(x)</n-h3>
    <n-h3 prefix="bar">
      -sin(x)
    </n-h3>
    <n-h3 prefix="bar" align-text>
      -sin(x)
    </n-h3>
    <n-h4>-cos(x)</n-h4>
    <n-h4 prefix="bar">
      -cos(x)
    </n-h4>
    <n-h4 prefix="bar" align-text>
      -cos(x)
    </n-h4>
    <n-h5>sin(x)</n-h5>
    <n-h5 prefix="bar">
      sin(x)
    </n-h5>
    <n-h5 prefix="bar" align-text>
      sin(x)
    </n-h5>
    <n-h6>循环啊！</n-h6>
    <n-h6 prefix="bar">
      循环啊！
    </n-h6>
    <n-h6 prefix="bar" align-text>
      循环啊！
    </n-h6>
  </div>
</template>
