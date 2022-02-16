<markdown>
# 默认展开

应当注意的是，即使只打算展开一个面板，`default-expanded-names`也应当传入数组，除非使用了`accordion`。
</markdown>

<template>
  <n-collapse :default-expanded-names="['2', '3']">
    <n-collapse-item title="绿灯" name="1">
      <n-collapse :default-expanded-names="['2']">
        <n-collapse-item title="常亮" name="1">
          <div>通过</div>
        </n-collapse-item>
        <n-collapse-item title="闪烁" name="2">
          <div>快速通过</div>
        </n-collapse-item>
      </n-collapse>
    </n-collapse-item>
    <n-collapse-item title="红灯" name="2">
      <div>停</div>
    </n-collapse-item>
    <n-collapse-item title="黄灯" name="3">
      <div>注意</div>
    </n-collapse-item>
  </n-collapse>
</template>
