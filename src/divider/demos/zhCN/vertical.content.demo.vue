<markdown>
# 垂直标题
</markdown>

<template>
  <div style="height: 200px">
    这个
    <n-divider vertical title-placement="before">
      实线
    </n-divider>
    和
    <n-divider
      vertical
      type="dashed"
      :theme-overrides="{
        borderWidth: '4px',
      }"
    >
      虚线
    </n-divider>
    还有
    <n-divider
      vertical
      type="dotted"
      title-placement="after"
      :theme-overrides="{
        borderWidth: '4px',
      }"
    >
      点线
    </n-divider>
    英文
    <n-divider vertical>
      What ?
    </n-divider>
  </div>
</template>
