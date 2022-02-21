<markdown>
# 嵌套

可以嵌套。
</markdown>

<template>
  <n-collapse>
    <n-collapse-item title="绿灯" name="1">
      <n-collapse>
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
  </n-collapse>
</template>
